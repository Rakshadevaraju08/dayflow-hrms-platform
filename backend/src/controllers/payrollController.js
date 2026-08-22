const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

exports.getMe = async (req, res, next) => {
  try {
    const profile = await prisma.employeeProfile.findUnique({
      where: { userId: req.user.id },
      include: { user: { select: { firstName: true, lastName: true, email: true } } }
    });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Employee profile not found' });
    }

    const grossSalary = (profile.basicSalary || 0) + (profile.allowances || 0);

    res.status(200).json({
      success: true,
      payroll: {
        basicSalary: profile.basicSalary,
        allowances: profile.allowances,
        deductions: profile.deductions,
        grossSalary,
        netSalary: profile.netSalary,
        salaryEffectiveDate: profile.salaryEffectiveDate
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPayroll = async (req, res, next) => {
  try {
    const profiles = await prisma.employeeProfile.findMany({
      include: { user: { select: { firstName: true, lastName: true, email: true } } }
    });

    const payrolls = profiles.map(profile => {
      const grossSalary = (profile.basicSalary || 0) + (profile.allowances || 0);
      return {
        employeeId: profile.userId,
        name: `${profile.user.firstName} ${profile.user.lastName}`.trim(),
        email: profile.user.email,
        basicSalary: profile.basicSalary,
        allowances: profile.allowances,
        deductions: profile.deductions,
        grossSalary,
        netSalary: profile.netSalary,
        salaryEffectiveDate: profile.salaryEffectiveDate
      };
    });

    res.status(200).json({ success: true, data: payrolls });
  } catch (error) {
    next(error);
  }
};

exports.updatePayroll = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { basicSalary, allowances, deductions, salaryEffectiveDate } = req.body;

    // Verify the user actually exists in the system first to prevent foreign key errors
    const userExists = await prisma.user.findUnique({
      where: { id: employeeId }
    });

    if (!userExists) {
      return res.status(404).json({ success: false, message: 'Employee not found in the system' });
    }

    let profile = await prisma.employeeProfile.findUnique({
      where: { userId: employeeId }
    });

    // Calculate updated net salary
    const newBasic = basicSalary !== undefined ? basicSalary : (profile?.basicSalary || 0);
    const newAllowances = allowances !== undefined ? allowances : (profile?.allowances || 0);
    const newDeductions = deductions !== undefined ? deductions : (profile?.deductions || 0);
    
    const grossSalary = newBasic + newAllowances;
    const netSalary = grossSalary - newDeductions;

    let updatedProfile;
    if (profile) {
      updatedProfile = await prisma.employeeProfile.update({
        where: { userId: employeeId },
        data: {
          basicSalary: newBasic,
          allowances: newAllowances,
          deductions: newDeductions,
          netSalary,
          salaryEffectiveDate: salaryEffectiveDate ? new Date(salaryEffectiveDate) : profile.salaryEffectiveDate
        }
      });
    } else {
      updatedProfile = await prisma.employeeProfile.create({
        data: {
          userId: employeeId,
          basicSalary: newBasic,
          allowances: newAllowances,
          deductions: newDeductions,
          netSalary,
          salaryEffectiveDate: salaryEffectiveDate ? new Date(salaryEffectiveDate) : new Date()
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payroll updated successfully',
      payroll: {
        basicSalary: updatedProfile.basicSalary,
        allowances: updatedProfile.allowances,
        deductions: updatedProfile.deductions,
        grossSalary,
        netSalary: updatedProfile.netSalary,
        salaryEffectiveDate: updatedProfile.salaryEffectiveDate
      }
    });
  } catch (error) {
    next(error);
  }
};

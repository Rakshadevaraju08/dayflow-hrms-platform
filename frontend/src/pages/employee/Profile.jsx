import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, 
  CreditCard, FileText, Download, Edit2, CheckCircle2, X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { employeeService } from '../../services/employeeService';
import { useAuth } from '../../context/AuthContext';

export function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ phone: '', address: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      if (!user?.id) return;
      const response = await employeeService.getMyProfile(user.id);
      setProfileData(response.data);
    } catch (err) {
      setFetchError('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setStatus('idle');
    setErrors({});
    setFormData({ 
      phone: profileData?.phone || '', 
      address: profileData?.address || '' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.address || formData.address.length < 10) {
      newErrors.address = "Detailed address is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('loading');
    
    try {
      const response = await employeeService.updateMyProfile({
        phone: formData.phone,
        address: formData.address
      }, user.id);
      setProfileData(response.data);
      setStatus('success');
      
      setTimeout(() => {
        setIsEditing(false);
      }, 1500);
    } catch (err) {
      setStatus('error');
    }
  };

  if (loading) return <LoadingState />;
  if (fetchError) return <ErrorState message={fetchError} onRetry={loadProfile} />;
  
  // Format dates securely
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Provided';
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  
  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const fullName = profileData?.user ? `${profileData.user.firstName} ${profileData.user.lastName}` : user?.firstName || 'User';
  const email = profileData?.user?.email || user?.email;



  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Top Profile Section */}
      <Card className="border-transparent shadow-soft overflow-hidden bg-white">
        {/* Cover Background */}
        <div className="h-32 bg-gradient-to-r from-brand-500 to-brand-700"></div>
        
        <CardContent className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 sm:-mt-16">
              {/* Profile Avatar */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-3xl sm:text-5xl shadow-md shrink-0 uppercase">
                {fullName.charAt(0)}
              </div>
              
              <div className="mb-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">
                    {fullName}
                  </h1>
                  <Badge variant="success" className="px-2.5 py-0.5">
                    Active
                  </Badge>
                </div>
                <p className="text-surface-600 font-medium flex items-center gap-2">
                  <Briefcase size={16} className="text-surface-400" />
                  {profileData?.designation || 'Not specified'} • {profileData?.department || 'Not specified'}
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="shrink-0 bg-white shadow-sm" onClick={handleEditClick}>
              <Edit2 size={16} className="mr-2" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Personal & Job Info) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Information */}
          <Card className="border-transparent shadow-soft bg-white">
            <CardHeader className="border-b border-surface-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
                <User size={18} className="text-brand-500" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="font-medium text-surface-900">{fullName}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-medium text-surface-900 flex items-center gap-2">
                    {email}
                    <CheckCircle2 size={14} className="text-green-500" />
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="font-medium text-surface-900">{profileData?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="font-medium text-surface-900">{formatDate(profileData?.dateOfBirth)}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Address</p>
                  <p className="font-medium text-surface-900 flex items-start gap-2">
                    <MapPin size={16} className="text-surface-400 mt-0.5 shrink-0" />
                    {profileData?.address || 'Not provided'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Information */}
          <Card className="border-transparent shadow-soft bg-white">
            <CardHeader className="border-b border-surface-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
                <Briefcase size={18} className="text-brand-500" /> Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Employee ID</p>
                  <p className="font-medium text-surface-900">{profileData?.employeeId || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Joining Date</p>
                  <p className="font-medium text-surface-900 flex items-center gap-2">
                    <Calendar size={16} className="text-surface-400" />
                    {formatDate(profileData?.joiningDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Job Title</p>
                  <p className="font-medium text-surface-900">{profileData?.designation || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Department</p>
                  <p className="font-medium text-surface-900">{profileData?.department || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Employment Type</p>
                  <p className="font-medium text-surface-900">{profileData?.employmentType || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Salary & Documents) */}
        <div className="space-y-8">
          
          {/* Salary Information */}
          <Card className="border-transparent shadow-soft bg-white overflow-hidden">
            <CardHeader className="border-b border-surface-100 pb-4 bg-surface-50/50">
              <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
                <CreditCard size={18} className="text-brand-500" /> Salary Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-surface-600">Base Salary</span>
                  <span className="font-semibold text-surface-900">{formatCurrency(profileData?.basicSalary)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-surface-600">Allowances</span>
                  <span className="font-semibold text-green-600">+{formatCurrency(profileData?.allowances)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-surface-600">Deductions</span>
                  <span className="font-semibold text-red-500">-{formatCurrency(profileData?.deductions)}</span>
                </div>
              </div>
              
              <div className="bg-brand-50 border-t border-brand-100 p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-800">Net Salary</p>
                </div>
                <p className="text-2xl font-bold text-brand-700">
                  {formatCurrency((profileData?.basicSalary || 0) + (profileData?.allowances || 0) - (profileData?.deductions || 0))}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-transparent shadow-soft bg-white">
            <CardHeader className="border-b border-surface-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
                <FileText size={18} className="text-brand-500" /> Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {profileData?.documents && profileData.documents.length > 0 ? profileData.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-surface-50 rounded-xl transition-colors group border border-transparent hover:border-surface-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900 line-clamp-1">{doc.fileName}</p>
                      <p className="text-xs text-surface-500">{doc.documentType}</p>
                    </div>
                  </div>
                  <button className="p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              )) : (
                <div className="p-6 text-center text-surface-500 text-sm">No documents found.</div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-soft-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-surface-100">
              <h2 className="text-xl font-bold text-surface-900">Edit Profile</h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-surface-400 hover:text-surface-600 transition-colors"
                disabled={status === 'loading'}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {status === 'success' && (
                <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} /> Profile updated successfully!
                </div>
              )}
              
              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm font-medium">
                  Failed to update profile. Please try again.
                </div>
              )}

              <div className="space-y-4">
                {/* Read Only Fields */}
                <div className="space-y-1.5 opacity-60">
                  <Label>Full Name (Read-only)</Label>
                  <Input value={fullName} readOnly disabled className="bg-surface-50 cursor-not-allowed" />
                </div>
                
                <div className="space-y-1.5 opacity-60">
                  <Label>Email (Read-only)</Label>
                  <Input value={email} readOnly disabled className="bg-surface-50 cursor-not-allowed" />
                </div>

                {/* Editable Fields */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={status === 'loading' || status === 'success'}
                    className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <textarea 
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={status === 'loading' || status === 'success'}
                    rows={3}
                    className={`flex w-full rounded-xl border ${errors.address ? 'border-red-500 focus-visible:ring-red-500' : 'border-surface-200 focus-visible:ring-brand-500'} bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm`}
                  />
                  {errors.address && <p className="text-xs text-red-500 font-medium">{errors.address}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-surface-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                  disabled={status === 'loading' || status === 'success'}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

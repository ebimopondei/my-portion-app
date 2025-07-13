import { useState } from "react"
import { Shield, Lock, LogOut } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Checkbox } from "../../ui/checkbox"

interface SettingsTabProps {
  notificationPreferences: {
    emailOrders: boolean
    smsOrders: boolean
  }
  onChangePassword: (passwords: any) => void
  onUpdateNotifications: (preferences: any) => void
  onLogout: () => void
}

const SettingsTab = ({ 
  notificationPreferences,
  onChangePassword,
  onUpdateNotifications,
  onLogout
}: SettingsTabProps) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [notifications, setNotifications] = useState(notificationPreferences)

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }

    setIsChangingPassword(true)
    try {
      await onChangePassword({
        currentPassword,
        newPassword,
        confirmPassword
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error('Error changing password:', error)
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleNotificationChange = (field: string, checked: boolean) => {
    const newPreferences = { ...notifications, [field]: checked }
    setNotifications(newPreferences)
    onUpdateNotifications(newPreferences)
  }

  return (
    <div className="space-y-8">
      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Your account security is important</h3>
            <p className="text-sm text-blue-700 mt-1">
              Keep your password secure and enable two-factor authentication for added protection.
            </p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-600">
            Update your password to keep your account secure
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>

          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
          >
            <Lock className="w-4 h-4 mr-2" />
            {isChangingPassword ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
          <p className="text-sm text-gray-600">
            Choose how you want to receive notifications
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="emailOrders"
              checked={notifications.emailOrders}
              onCheckedChange={(checked) => handleNotificationChange('emailOrders', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="emailOrders" className="text-sm font-medium text-gray-700">
                Email Notifications
              </Label>
              <p className="text-xs text-gray-500">Receive email notifications when customers place orders</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="smsOrders"
              checked={notifications.smsOrders}
              onCheckedChange={(checked) => handleNotificationChange('smsOrders', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="smsOrders" className="text-sm font-medium text-gray-700">
                SMS Notifications
              </Label>
              <p className="text-xs text-gray-500">Receive SMS notifications for urgent order updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Account Actions</h3>
          <p className="text-sm text-gray-600">
            Manage your account and session
          </p>
        </div>

        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default SettingsTab 
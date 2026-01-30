import { Shield, CheckCircle2, Lock, Eye, Fingerprint } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

export function SecurityFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto mt-6">
      {/* Two-Factor Authentication */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Fingerprint className="size-4 text-green-600" />
            </div>
            <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            Optional 2FA can be enabled for additional account security using SMS or authenticator apps.
          </CardDescription>
        </CardContent>
      </Card>

      {/* CAPTCHA Protection */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="size-4 text-blue-600" />
            </div>
            <CardTitle className="text-base">CAPTCHA Protection</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            Automated bot protection is enabled to prevent unauthorized access attempts and ensure system integrity.
          </CardDescription>
        </CardContent>
      </Card>

      {/* End-to-End Encryption */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lock className="size-4 text-purple-600" />
            </div>
            <CardTitle className="text-base">End-to-End Encryption</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            All communications between your device and our servers are encrypted using TLS 1.3 protocol.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="size-4 text-orange-600" />
            </div>
            <CardTitle className="text-base">Complete Audit Trail</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            All login attempts and account activities are logged for security monitoring and compliance purposes.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

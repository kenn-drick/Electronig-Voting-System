import { RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function CaptchaPlaceholder() {
  return (
    <div className="space-y-2">
      <div className="border-2 border-slate-200 rounded-lg p-4 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="captcha-check"
              className="size-6 cursor-pointer"
            />
            <label htmlFor="captcha-check" className="text-sm font-medium cursor-pointer">
              I'm not a robot
            </label>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="size-5 text-slate-400 mb-1" />
            <div className="text-xs text-slate-500">reCAPTCHA</div>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Protected by reCAPTCHA: <a href="#" className="text-blue-600 hover:underline">Privacy</a> · <a href="#" className="text-blue-600 hover:underline">Terms</a>
      </p>
    </div>
  );
}

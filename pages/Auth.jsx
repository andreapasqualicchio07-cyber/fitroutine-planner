import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";

export default function Auth() {
  const initialMode = new URLSearchParams(window.location.search).get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const switchMode = (m) => { setMode(m); setError(""); setShowOtp(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && password !== confirmPassword) { setError("Le password non coincidono"); return; }
    setLoading(true);
    try {
      if (mode === "login") {
        await base44.auth.loginViaEmailPassword(email, password);
        window.location.href = "/app";
      } else {
        await base44.auth.register({ email, password });
        setShowOtp(true);
      }
    } catch (err) {
      setError(err.message || "Operazione non riuscita");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) base44.auth.setToken(result.access_token);
      window.location.href = "/pricing";
    } catch (err) {
      setError(err.message || "Codice non valido");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try { await base44.auth.resendOtp(email); } catch (err) { setError(err.message || "Invio non riuscito"); }
  };

  const handleGoogle = () => base44.auth.loginWithProvider("google", "/app");
  const handleApple = () => base44.auth.loginWithProvider("apple", "/app");

  const isLogin = mode === "login";

  if (showOtp) {
    return (
      <AuthLayout icon={Mail} title="Verifica la tua email" subtitle={`Abbiamo inviato un codice a ${email}`}>
        {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
            <InputOTPGroup>
              <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
              <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full h-12 font-medium" onClick={handleVerify} disabled={loading || otpCode.length < 6}>
          {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifica...</>) : "Verifica"}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Non hai ricevuto il codice?{" "}
          <button onClick={handleResend} className="text-primary font-medium hover:underline">Reinvia</button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={isLogin ? LogIn : UserPlus}
      title={isLogin ? "Bentornato" : "Crea il tuo account"}
      subtitle={isLogin ? "Accedi al tuo account" : "Registrati per iniziare"}
      footer={
        isLogin ? (
          <>Non hai un account?{" "}
            <button onClick={() => switchMode("register")} className="text-primary font-medium hover:underline">Registrati</button>
          </>
        ) : (
          <>Hai già un account?{" "}
            <button onClick={() => switchMode("login")} className="text-primary font-medium hover:underline">Accedi</button>
          </>
        )
      }
    >
      <Button variant="outline" className="w-full h-12 text-sm font-medium mb-2" onClick={handleGoogle}>
        <GoogleIcon className="w-5 h-5 mr-2" /> Continua con Google
      </Button>
      <Button variant="outline" className="w-full h-12 text-sm font-medium mb-6" onClick={handleApple}>
        <span className="mr-2 text-base"></span> Continua con Apple
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">oppure</span></div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="email" type="email" autoComplete="email" autoFocus placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required />
          </div>
        </div>
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirm">Conferma Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input id="confirm" type="password" autoComplete="new-password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 h-12" required />
            </div>
          </div>
        )}
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {isLogin ? "Accesso..." : "Creazione..."}</>) : (isLogin ? "Accedi" : "Crea account")}
        </Button>
      </form>

      {isLogin && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link to="/forgot-password" className="text-primary font-medium hover:underline">Password dimenticata?</Link>
        </p>
      )}
    </AuthLayout>
  );
}
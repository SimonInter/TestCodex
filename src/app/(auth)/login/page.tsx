import { Shell } from "@/components/layout/shell";
import AuthForm from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-md px-6 py-16">
        <AuthForm />
      </div>
    </Shell>
  );
}

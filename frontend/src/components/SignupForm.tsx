"use client";

import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { signUp } from "~/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await signUp(data);
      if (!result.success) {
        setError(result.error ?? "An error occured during signup");
        return;
      }

      const signUpResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signUpResult?.error) {
        setError(
          "Account created but couldn't sign in automatically. Please try again.",
        );
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occured");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Button
        className="absolute top-10 left-10"
        variant="outline"
        size="icon"
        asChild
      >
        <Link href="/">
          <ArrowLeftIcon className="size-4" />
        </Link>
      </Button>
      <div className="rounded-2xl border border-[#F1F1F1] bg-white p-8 shadow-[0_20px_60px_rgba(24,62,194,0.15)]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#183EC2] to-[#001E80]">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-2xl font-bold text-transparent">
              ClipMind
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-3xl font-bold text-transparent">
            Create Your Account
          </h1>
          <p className="text-[#010D3E]/60">
            Start creating viral clips in minutes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="bg-white"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              {...register("password")}
              className="bg-white"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <p className="text-xs text-[#010D3E]/50">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="text-center text-xs text-[#010D3E]/60">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-[#183EC2] underline hover:text-[#001E80]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#183EC2] underline hover:text-[#001E80]"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#010D3E]/60">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#183EC2] transition-colors hover:text-[#001E80]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

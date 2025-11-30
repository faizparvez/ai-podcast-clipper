"use client";

import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { loginSchema, type LoginFormValues } from "~/schemas/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export function LoginForm({
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
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Invalid email or password.");
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
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="vGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#E0E7FF", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>

                {/* Complete A shape behind (with apex at top) */}
                <path
                  d="M6 22 L12 4 L18 22"
                  stroke="url(#vGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />

                {/* Horizontal bar of A (crossbar) */}
                <path
                  d="M8.5 15 L15.5 15"
                  stroke="url(#vGradient)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* V Shape on top (main focus) */}
                <path
                  d="M4 8 L12 22 L20 8"
                  stroke="url(#vGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-2xl font-bold text-transparent">
              ViralAI
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-3xl font-bold text-transparent">
            Welcome Back
          </h1>
          <p className="text-[#010D3E]/60">
            Log in to continue creating viral clips
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#183EC2] transition-colors hover:text-[#001E80]"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="bg-white"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#010D3E]/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#183EC2] transition-colors hover:text-[#001E80]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

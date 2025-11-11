"use client";

import type { VariantProps } from "class-variance-authority";
import { CheckIcon, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { createCheckoutSession, type PriceId } from "~/actions/stripe";
import { Button, type buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import { Footer } from "~/components/Footer";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  isPopular?: boolean;
  savePercentage?: string;
  priceId: PriceId;
}

const plans: PricingPlan[] = [
  {
    title: "Small Pack",
    price: "$9.99",
    description: "Perfect for occasional podcast creators",
    features: ["50 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 50 credits",
    buttonVariant: "outline",
    priceId: "small",
  },
  {
    title: "Medium Pack",
    price: "$24.99",
    description: "Best value for regular podcasters",
    features: ["150 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 150 credits",
    buttonVariant: "default",
    isPopular: true,
    savePercentage: "Save 17%",
    priceId: "medium",
  },
  {
    title: "Large Pack",
    price: "$69.99",
    description: "Ideal for podcast studios and agencies",
    features: ["500 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 500 credits",
    buttonVariant: "outline",
    isPopular: false,
    savePercentage: "Save 30%",
    priceId: "large",
  },
];

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const isPopular = plan.isPopular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className={cn(
        "relative flex flex-col",
        isPopular && "md:z-10 md:scale-105",
      )}
    >
      <Card
        className={cn(
          "relative flex flex-col border bg-white transition-all duration-300 hover:shadow-xl",
          isPopular
            ? "border-2 border-[#183EC2] shadow-[0_20px_60px_rgba(24,62,194,0.2)]"
            : "border-[#000000] shadow-sm hover:shadow-md",
        )}
      >
        {isPopular && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <div className="tag flex items-center gap-2 border-none bg-gradient-to-br from-[#183EC2] to-[#001E80] px-3 py-1.5 shadow-lg">
              <span className="bg-white [background-size:200%] bg-clip-text font-bold whitespace-nowrap text-transparent">
                ⭐ Most Popular
              </span>
            </div>
          </motion.div>
        )}

        <CardHeader
          className={cn(
            "flex-1 space-y-3",
            isPopular ? "pt-8 pb-4" : "pt-6 pb-4",
          )}
        >
          <CardTitle className="text-3xl font-bold text-[#010D3E]">
            {plan.title}
          </CardTitle>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text font-bold text-transparent",
                isPopular ? "text-4xl" : "text-3xl",
              )}
            >
              {plan.price}
            </span>
            <span className="text-sm text-[#010D3E]/60">one-time</span>
          </div>
          {plan.savePercentage && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-2.5 py-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-green-600" />
              <p className="font-semibold text-green-700">
                {plan.savePercentage}
              </p>
            </motion.div>
          )}
          <CardDescription className="leading-relaxed text-[#010D3E]/70">
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 pb-2">
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#183EC2]/10">
                  <CheckIcon className="h-3.5 w-3.5 text-[#183EC2]" />
                </div>
                <span className="text-sm text-[#000000]">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="border-t border-[#F1F1F1] pt-1">
          <form
            action={() => createCheckoutSession(plan.priceId)}
            className="w-full"
          >
            <Button
              variant={plan.buttonVariant}
              className={cn(
                "w-full text-[16px] font-semibold transition-all duration-300",
                isPopular
                  ? "btn btn-primary h-11 shadow-lg hover:shadow-xl"
                  : "h-10 cursor-pointer hover:bg-[#DCE4FF]",
              )}
              type="submit"
            >
              {plan.buttonText}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function HowCreditsWork() {
  const steps = [
    {
      number: 1,
      text: "1 credit = 1 minute of podcast processing",
    },
    {
      number: 2,
      text: "The program will create around 1 clip per 5 minutes of podcast",
    },
    {
      number: 3,
      text: "Credits never expire and can be used anytime",
    },
    {
      number: 4,
      text: "Longer podcasts require more credits based on duration",
    },
    {
      number: 5,
      text: "All packages are one-time purchases (not subscription)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mx-auto max-w-4xl rounded-2xl border border-[#F1F1F1] bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-18 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-[#183EC2]/10 to-[#001E80]/10">
          <Clock className="h-6 w-6 text-[#183EC2]" />
        </div>
        <h3 className="text-4xl font-bold text-[#010D3E]">How Credits Work</h3>
      </div>
      <ul className="space-y-3.5">
        {steps.map((step, index) => (
          <motion.li
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex items-start gap-3.5"
          >
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80] font-bold text-white shadow-sm">
              {step.number}
            </span>
            <span className="pt-0.5 text-[17px] leading-relaxed text-[#010D3E]/80">
              {step.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function BillingPage() {
  return (
    <div
      className="fixed inset-0 w-full overflow-y-auto"
      style={{
        background:
          "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            {/* <Button
              className="absolute top-0 left-0 border-[#F1F1F1] bg-white hover:bg-[#EAEEFE]"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
            </Button> */}
            <div className="section-heading text-center">
              {/* Pricing Tag */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-3 flex justify-center"
              >
                <div className="tag">
                  <Sparkles className="mr-2 h-4 w-4 text-[#183EC2]" />
                  Pricing
                </div>
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-1 text-4xl font-bold text-[#000000] sm:text-5xl"
              >
                Simple Pricing
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="section-description mt-3 mb-3"
              >
                One-time purchases, no subscriptions. Buy credits once and use
                them forever.
              </motion.p>
            </div>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
            {plans.map((plan, index) => (
              <PricingCard key={plan.title} plan={plan} index={index} />
            ))}
          </div>

          {/* How Credits Work Section */}
          <HowCreditsWork />

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="rounded-2xl bg-gradient-to-br from-[#183EC2] to-[#001E80] px-6 py-10 text-center shadow-xl"
          >
            <h3 className="mb-3 text-2xl font-bold text-white">
              Ready to Create Viral Clips?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base text-white/90">
              Join thousands of podcasters who are already growing their
              audience with AI-powered clips
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="h-auto bg-white px-6 py-5 text-[18px] font-semibold text-[#183EC2] hover:bg-white/90"
              >
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer - Place your Footer component here */}
      <Footer />
    </div>
  );
}

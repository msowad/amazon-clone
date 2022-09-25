import {
  DoneAll,
  LocalShipping,
  LockOutlined,
  MonetizationOn,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NextLink from "next/link";

interface Props {
  activeStep: 1 | 2 | 3;
  enableHref?: boolean;
}

const steps = [
  { label: "Login" },
  { label: "Shipping", href: "/checkout" },
  { label: "Payment", href: "/checkout/payment" },
  { label: "Place order" },
];

const CheckoutStepper: React.FC<Props> = ({ activeStep, enableHref }) => {
  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            {step.href && enableHref ? (
              <NextLink href={step.href} passHref>
                <a>
                  <StepLabel>{step.label}</StepLabel>
                </a>
              </NextLink>
            ) : (
              <StepLabel>{step.label}</StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutStepper;

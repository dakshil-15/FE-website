import type { Metadata } from "next";
import CareersPage from "@/components/careers/CareersPage";
import { getCareerRoles } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career at First Economy — engineer impact across media, creative, technology and data. Explore open roles across Mumbai, Bengaluru, Pune and Aurangabad.",
};

export const revalidate = 3600;

export default async function Page() {
  const roles = await getCareerRoles();
  return <CareersPage roles={roles} />;
}

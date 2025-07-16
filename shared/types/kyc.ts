import type { KycBusinessDocsAttribute } from "./kyc-business-docs"
import type { KycIdVerificationAttribute } from "./kyc-id-verification"
import type { KycBusinessAttribute } from "./KycBusiness"
import type { KycPersonalAttribute } from "./KycPersonal"

export interface kycDetails {
    personal: KycPersonalAttribute | null,
    business: KycBusinessAttribute | null
    docs: KycBusinessDocsAttribute | null
    id: KycIdVerificationAttribute | null
}
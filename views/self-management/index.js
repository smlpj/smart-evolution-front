import { useContext, useMemo } from "react";

import Head from "next/head";

import { ClientType } from "@components/selects/queries";

import { useFetch } from "@hooks/useFetch";

import { FormContext, FormProvider } from "./Context";
import ClientTypeStep from "./Steps/ClientTypeStep";
import EmailStep from "./Steps/EmailStep";
import ActionaryCompositionStep from "./Steps/LegalSteps/ActionaryCompositionStep";
import AddressStep from "./Steps/LegalSteps/AddressStep";
import AnualDictamenStep from "./Steps/LegalSteps/AnualDictamenStep";
import AssetLaunderingPreventionStep from "./Steps/LegalSteps/AssetLaunderingPreventionStep";
import AttributionsAndLimitationsSteps from "./Steps/LegalSteps/AttributionsAndLimitationsSteps";
import BankCertificationStep from "./Steps/LegalSteps/BankCertificationStep";
import BusinessSeasonalityStep from "./Steps/LegalSteps/BusinessSeasonalityStep";
import CIIUStep from "./Steps/LegalSteps/CIIUStep";
import CityStep from "./Steps/LegalSteps/CityStep";
import ConstitutionDateStep from "./Steps/LegalSteps/ConstitutionDateStep";
import ContactEmailStep from "./Steps/LegalSteps/ContactEmailStep";
import ContactFirstNameStep from "./Steps/LegalSteps/ContactFirstNameStep";
import ContactLastNameStep from "./Steps/LegalSteps/ContactLastNameStep";
import ContactPhoneStep from "./Steps/LegalSteps/ContactPhoneStep";
import ContactRoleStep from "./Steps/LegalSteps/ContactRoleStep";
import CountryStep from "./Steps/LegalSteps/CountryStep";
import CoverageStep from "./Steps/LegalSteps/CoverageStep";
import DeclarationOfAportedResponsibilityStep from "./Steps/LegalSteps/DeclarationOfAportedResponsibilityStep";
import DeclarationOfRiskPreventionStep from "./Steps/LegalSteps/DeclarationOfRiskPreventionStep";
import DepartmentStep from "./Steps/LegalSteps/DepartmentStep";
import EmployeesNumberStep from "./Steps/LegalSteps/EmployeesNumberStep";
import ExercisePublicPowerStep from "./Steps/LegalSteps/ExercisePublicPowerStep";
import ExistingAndLegalRepresentationCertificationStep from "./Steps/LegalSteps/ExistingAndLegalRepresentationCertificationStep";
import FinancialStatesCertificationStep from "./Steps/LegalSteps/FinancialStatesCertificationStep";
import ForeignCurrencyAccountBankStep from "./Steps/LegalSteps/ForeignCurrencyAccountBankStep";
import ForeignCurrencyAccountNumberStep from "./Steps/LegalSteps/ForeignCurrencyAccountNumberStep";
import ForeignCurrencyAccountsStep from "./Steps/LegalSteps/ForeignCurrencyAccountsStep";
import ForeignCurrencyCountryStep from "./Steps/LegalSteps/ForeignCurrencyCountryStep";
import ForeignCurrencyOperationsDescriptionStep from "./Steps/LegalSteps/ForeignCurrencyOperationsDescriptionStep";
import ForeignCurrencyOperationsStep from "./Steps/LegalSteps/ForeignCurrencyOperationsStep";
import ForeignCurrencyStep from "./Steps/LegalSteps/ForeignCurrencyStep";
import ForeingTaxObligationStep from "./Steps/LegalSteps/ForeingTaxObligationStep";
import FutureProjectsAndProjectionsStep from "./Steps/LegalSteps/FutureProjectsAndProjectionsStep";
import GreatContributorStep from "./Steps/LegalSteps/GreatContributorStep";
import HandlePublicResourcesStep from "./Steps/LegalSteps/HandlePublicResourcesStep";
import IcaRateStep from "./Steps/LegalSteps/IcaRateStep";
import LAFTRiskPreventionAuditorStep from "./Steps/LegalSteps/LAFTRiskPreventionAuditorStep";
import LAFTRiskPreventionStep from "./Steps/LegalSteps/LAFTRiskPreventionStep";
import LegalRepAddressStep from "./Steps/LegalSteps/LegalRepAddressStep";
import LegalRepBirthDateStep from "./Steps/LegalSteps/LegalRepBirthDateStep";
import LegalRepCitizenshipStep from "./Steps/LegalSteps/LegalRepCitizenshipStep";
import LegalRepCityStep from "./Steps/LegalSteps/LegalRepCityStep";
import LegalRepDepartmentStep from "./Steps/LegalSteps/LegalRepDepartmentStep";
import LegalRepDocumentNumberStep from "./Steps/LegalSteps/LegalRepDocumentNumberStep";
import LegalRepDocumentTypeStep from "./Steps/LegalSteps/LegalRepDocumentTypeStep";
import LegalRepEmailStep from "./Steps/LegalSteps/LegalRepEmailStep";
import LegalRepLastNameStep from "./Steps/LegalSteps/LegalRepLastNameStep";
import LegalRepNameStep from "./Steps/LegalSteps/LegalRepNameStep";
import LegalRepPhoneNumberStep from "./Steps/LegalSteps/LegalRepPhoneNumberStep";
import LegalRepTelStep from "./Steps/LegalSteps/LegalRepTelStep";
import LegalRepresentativeCertificationStep from "./Steps/LegalSteps/LegalRepresentativeCertificationStep";
import ManagementBoardStep from "./Steps/LegalSteps/ManagementBoardStep";
import NitStep from "./Steps/LegalSteps/NitStep";
import PhoneNumberStep from "./Steps/LegalSteps/PhoneNumberStep";
import PoliticsAndRiskPreventionStep from "./Steps/LegalSteps/PoliticsAndRiskPreventionStep";
import PrincipalCompetitorsStep from "./Steps/LegalSteps/PrincipalCompetitorsStep";
import PrincipalCustomersStep from "./Steps/LegalSteps/PrincipalCustomersStep";
import PrincipalProductsStep from "./Steps/LegalSteps/PrincipalProductsStep";
import PrincipalProvidersStep from "./Steps/LegalSteps/PrincipalProvidersStep";
import PublicPersonRelationDescriptionStep from "./Steps/LegalSteps/PublicPersonRelationDescriptionStep";
import PublicPersonRelationStep from "./Steps/LegalSteps/PublicPersonRelationStep";
import PublicRecongnitionStep from "./Steps/LegalSteps/PublicRecongnitionStep";
import RentDeclarationStep from "./Steps/LegalSteps/RentDeclarationStep";
import RetentionRateStep from "./Steps/LegalSteps/RetentionRateStep";
import RutCertificationStep from "./Steps/LegalSteps/RutCertificationStep";
import SelfRetainerStep from "./Steps/LegalSteps/SelfRetainerStep";
import ShareHoldersAndAssociatesStep from "./Steps/LegalSteps/ShareHoldersAndAssociatesStep";
import SocialObjectStep from "./Steps/LegalSteps/SocialObjectStep";
import SocialReasonStep from "./Steps/LegalSteps/SocialReasonStep";
import TemporalEmployeesNumberStep from "./Steps/LegalSteps/TemporalEmployeesNumberStep";
import TypeForeignCurrencyAccountStep from "./Steps/LegalSteps/TypeForeignCurrencyAccountStep";
import UsedCapacityVsInstalledCapacityStep from "./Steps/LegalSteps/UsedCapacityVsInstalledCapacityStep";
import VerificationAuthorizationStep from "./Steps/LegalSteps/VerificationAuthorizationStep";
import ForeingTaxObligationDescriptionStep from "./Steps/LegalSteps/foreingTaxObligationDescriptionStep";
import LinkTypeStep from "./Steps/LinkTypeStep";
import ActivityDescriptionStep from "./Steps/NaturalSteps/ActivityDescriptionStep";
import NaturalAddressStep from "./Steps/NaturalSteps/AddressStep";
import AssetsSteps from "./Steps/NaturalSteps/AssetsSteps";
import BankReferenceCityStep from "./Steps/NaturalSteps/BankReferenceCityStep";
import BankReferenceDepartmentStep from "./Steps/NaturalSteps/BankReferenceDepartmentStep";
import BankReferenceNameStep from "./Steps/NaturalSteps/BankReferenceNameStep";
import BankReferencePhoneStep from "./Steps/NaturalSteps/BankReferencePhoneStep";
import BankReferenceProductStep from "./Steps/NaturalSteps/BankReferenceProductStep";
import NaturalCIIUStep from "./Steps/NaturalSteps/CIIUStep";
import NaturalCityStep from "./Steps/NaturalSteps/CityStep";
import CompanyActivityStep from "./Steps/NaturalSteps/CompanyActivityStep";
import CompanyAddressStep from "./Steps/NaturalSteps/CompanyAddressStep";
import CompanyCityStep from "./Steps/NaturalSteps/CompanyCityStep";
import CompanyDepartmentStep from "./Steps/NaturalSteps/CompanyDepartmentStep";
import CompanyNameStep from "./Steps/NaturalSteps/CompanyNameStep";
import CompanyPhoneStep from "./Steps/NaturalSteps/CompanyPhoneStep";
import CompanyRoleStep from "./Steps/NaturalSteps/CompanyRoleStep";
import NaturalCountryStep from "./Steps/NaturalSteps/CountryStep";
import DateExpeditionStep from "./Steps/NaturalSteps/DateExpeditionStep";
import NaturalDepartmentStep from "./Steps/NaturalSteps/DepartmentStep";
import DocumentExpeditionStep from "./Steps/NaturalSteps/DocumentExpeditionStep";
import DocumentNumberStep from "./Steps/NaturalSteps/DocumentNumberStep";
import DocumentTypeStep from "./Steps/NaturalSteps/DocumentTypeStep";
import FirstNameStep from "./Steps/NaturalSteps/FirstNameStep";
import ForeignTaxObligationDescriptionStep from "./Steps/NaturalSteps/ForeignTaxObligationDescriptionStep";
import ForeignTaxObligationStep from "./Steps/NaturalSteps/ForeignTaxObligationStep";
import NaturalHandlePublicResourcesStep from "./Steps/NaturalSteps/HandlePublicResourcesStep";
import LastNameStep from "./Steps/NaturalSteps/LastNameStep";
import MensualIncomeStep from "./Steps/NaturalSteps/MensualIncomeStep";
import MensualPassivesStep from "./Steps/NaturalSteps/MensualPassivesStep";
import OtherAssetsConceptStep from "./Steps/NaturalSteps/OtherAssetsConceptStep";
import OtherAssetsStep from "./Steps/NaturalSteps/OtherAssetsStep";
import PassivesStep from "./Steps/NaturalSteps/PassivesStep";
import PatrimonyStep from "./Steps/NaturalSteps/PatrimonyStep";
import NaturalPhoneNumberStep from "./Steps/NaturalSteps/PhoneNumberStep";
import ProfessionStep from "./Steps/NaturalSteps/ProfessionStep";
import NaturalPublicPersonRelationDescriptionStep from "./Steps/NaturalSteps/PublicPersonRelationDescriptionStep";
import NaturalPublicPersonRelationStep from "./Steps/NaturalSteps/PublicPersonRelationStep";
import NaturalPublicRecongnitionStep from "./Steps/NaturalSteps/PublicRecongnitionStep";
import ReferenceCityStep from "./Steps/NaturalSteps/ReferenceCityStep";
import ReferenceCompanyStep from "./Steps/NaturalSteps/ReferenceCompanyStep";
import ReferenceDepartmentStep from "./Steps/NaturalSteps/ReferenceDepartmentStep";
import ReferenceFirstNameStep from "./Steps/NaturalSteps/ReferenceFirstNameStep";
import ReferenceLastNameStep from "./Steps/NaturalSteps/ReferenceLastNameStep";
import ReferencePhoneStep from "./Steps/NaturalSteps/ReferencePhoneStep";
import TermsAndConditionsStep from "./Steps/NaturalSteps/TermsAndConditionsStep";
import TypeActivityStep from "./Steps/NaturalSteps/TypeActivityStep";
import TypeProductsStep from "./Steps/NaturalSteps/TypeProductsStep";
import StartStep from "./Steps/StartStep";
import { SelfManagement as SelfManagementComponents } from "./component";

const naturalSteps = [
  { sectionId: 1, component: FirstNameStep },
  { sectionId: 1, component: LastNameStep },
  { sectionId: 1, component: DocumentTypeStep },
  { sectionId: 1, component: DocumentNumberStep },
  { sectionId: 1, component: DocumentExpeditionStep },
  { sectionId: 1, component: DateExpeditionStep },
  { sectionId: 1, component: NaturalCountryStep },
  { sectionId: 1, component: NaturalDepartmentStep },
  { sectionId: 1, component: NaturalCityStep },
  { sectionId: 1, component: NaturalAddressStep },
  { sectionId: 1, component: NaturalPhoneNumberStep },
  { sectionId: 1, component: ProfessionStep },
  { sectionId: 2, component: TypeActivityStep },
  { sectionId: 2, component: CompanyNameStep },
  { sectionId: 2, component: CompanyActivityStep },
  { sectionId: 2, component: CompanyRoleStep },
  { sectionId: 2, component: CompanyPhoneStep },
  { sectionId: 2, component: CompanyDepartmentStep },
  { sectionId: 2, component: CompanyCityStep },
  { sectionId: 2, component: CompanyAddressStep },
  { sectionId: 2, component: NaturalCIIUStep },
  { sectionId: 2, component: TypeProductsStep },
  { sectionId: 2, component: MensualIncomeStep },
  { sectionId: 2, component: MensualPassivesStep },
  { sectionId: 2, component: AssetsSteps },
  { sectionId: 2, component: PassivesStep },
  { sectionId: 2, component: PatrimonyStep },
  { sectionId: 2, component: OtherAssetsStep },
  { sectionId: 2, component: OtherAssetsConceptStep },
  { sectionId: 3, component: NaturalHandlePublicResourcesStep },
  { sectionId: 3, component: NaturalPublicRecongnitionStep },
  { sectionId: 3, component: NaturalPublicPersonRelationStep },
  { sectionId: 3, component: NaturalPublicPersonRelationDescriptionStep },
  { sectionId: 4, component: ForeignTaxObligationStep },
  { sectionId: 4, component: ForeignTaxObligationDescriptionStep },
  { sectionId: 5, component: ReferenceFirstNameStep },
  { sectionId: 5, component: ReferenceLastNameStep },
  { sectionId: 5, component: ReferencePhoneStep },
  { sectionId: 5, component: ReferenceCompanyStep },
  { sectionId: 5, component: ReferenceDepartmentStep },
  { sectionId: 5, component: ReferenceCityStep },
  { sectionId: 5, component: BankReferenceNameStep },
  { sectionId: 5, component: BankReferencePhoneStep },
  { sectionId: 5, component: BankReferenceProductStep },
  { sectionId: 5, component: BankReferenceDepartmentStep },
  { sectionId: 5, component: BankReferenceCityStep },
  { sectionId: 5, component: ActivityDescriptionStep },
  { sectionId: 5, component: TermsAndConditionsStep },
];
const legalSteps = [
  { sectionId: 1, component: SocialReasonStep },
  { sectionId: 1, component: NitStep },
  { sectionId: 1, component: ConstitutionDateStep },
  { sectionId: 1, component: CountryStep },
  { sectionId: 1, component: DepartmentStep },
  { sectionId: 1, component: CityStep },
  { sectionId: 1, component: AddressStep },
  { sectionId: 1, component: PhoneNumberStep },
  { sectionId: 1, component: SocialObjectStep },
  { sectionId: 2, component: CIIUStep },
  { sectionId: 2, component: CoverageStep },
  { sectionId: 2, component: EmployeesNumberStep },
  { sectionId: 2, component: TemporalEmployeesNumberStep },
  { sectionId: 2, component: GreatContributorStep },
  { sectionId: 2, component: SelfRetainerStep },
  { sectionId: 2, component: IcaRateStep },
  { sectionId: 2, component: RetentionRateStep },
  { sectionId: 2, component: ManagementBoardStep },
  { sectionId: 2, component: ShareHoldersAndAssociatesStep },
  { sectionId: 2, component: LegalRepNameStep },
  { sectionId: 2, component: LegalRepLastNameStep },
  { sectionId: 2, component: LegalRepDocumentTypeStep },
  { sectionId: 2, component: LegalRepDocumentNumberStep },
  { sectionId: 2, component: LegalRepBirthDateStep },
  { sectionId: 2, component: LegalRepCitizenshipStep },
  { sectionId: 2, component: LegalRepDepartmentStep },
  { sectionId: 2, component: LegalRepCityStep },
  { sectionId: 2, component: LegalRepAddressStep },
  { sectionId: 2, component: LegalRepTelStep },
  { sectionId: 2, component: LegalRepPhoneNumberStep },
  { sectionId: 2, component: LegalRepEmailStep },
  { sectionId: 2, component: AttributionsAndLimitationsSteps },
  { sectionId: 3, component: ForeignCurrencyOperationsStep },
  { sectionId: 3, component: ForeignCurrencyOperationsDescriptionStep },
  { sectionId: 3, component: ForeignCurrencyAccountsStep },
  { sectionId: 3, component: TypeForeignCurrencyAccountStep },
  { sectionId: 3, component: ForeignCurrencyAccountNumberStep },
  { sectionId: 3, component: ForeignCurrencyAccountBankStep },
  { sectionId: 3, component: ForeignCurrencyCountryStep },
  { sectionId: 3, component: ForeignCurrencyStep },
  { sectionId: 3, component: PrincipalProductsStep },
  { sectionId: 3, component: PrincipalCustomersStep },
  { sectionId: 3, component: PrincipalProvidersStep },
  { sectionId: 3, component: PrincipalCompetitorsStep },
  { sectionId: 3, component: BusinessSeasonalityStep },
  { sectionId: 3, component: UsedCapacityVsInstalledCapacityStep },
  { sectionId: 3, component: FutureProjectsAndProjectionsStep },
  { sectionId: 4, component: HandlePublicResourcesStep },
  { sectionId: 4, component: ExercisePublicPowerStep },
  { sectionId: 4, component: PublicRecongnitionStep },
  { sectionId: 4, component: PublicPersonRelationStep },
  { sectionId: 4, component: PublicPersonRelationDescriptionStep },
  { sectionId: 4, component: ForeingTaxObligationStep },
  { sectionId: 4, component: ForeingTaxObligationDescriptionStep },
  { sectionId: 4, component: PoliticsAndRiskPreventionStep },
  { sectionId: 4, component: AssetLaunderingPreventionStep },
  { sectionId: 4, component: LAFTRiskPreventionStep },
  { sectionId: 4, component: AnualDictamenStep },
  { sectionId: 4, component: LAFTRiskPreventionAuditorStep },
  { sectionId: 4, component: DeclarationOfRiskPreventionStep },
  { sectionId: 4, component: DeclarationOfAportedResponsibilityStep },
  { sectionId: 4, component: VerificationAuthorizationStep },
  { sectionId: 5, component: ContactFirstNameStep },
  { sectionId: 5, component: ContactLastNameStep },
  { sectionId: 5, component: ContactRoleStep },
  { sectionId: 5, component: ContactEmailStep },
  { sectionId: 5, component: ContactPhoneStep },
  { sectionId: 5, component: BankCertificationStep },
  { sectionId: 5, component: ExistingAndLegalRepresentationCertificationStep },
  { sectionId: 5, component: FinancialStatesCertificationStep },
  { sectionId: 5, component: RentDeclarationStep },
  { sectionId: 5, component: RutCertificationStep },
  { sectionId: 5, component: LegalRepresentativeCertificationStep },
  { sectionId: 5, component: ActionaryCompositionStep },
];

const Wrapper = (props) => {
  const { ...rest } = props;

  const { data } = useContext(FormContext);

  const { loading: loading, data: requestData } = useFetch({
    service: ClientType,
    init: true,
  });

  const clientTypes = requestData?.data || [];

  const naturalTypeId = clientTypes.find(
    (type) => type.description === "Persona Natural"
  )?.id;
  const legalTypeId = clientTypes.find(
    (type) => type.description === "Persona Jurídica"
  )?.id;

  const clientType = data.body.value?.typeClient;

  const isNatural = clientType === naturalTypeId;
  const isLegal = clientType === legalTypeId;

  const stepsComponents = useMemo(
    () => [
      { sectionId: 1, component: StartStep },
      { sectionId: 1, component: EmailStep },
      { sectionId: 1, component: LinkTypeStep },
      { sectionId: 1, component: ClientTypeStep },
      ...(isNatural ? naturalSteps : []),
      ...(isLegal ? legalSteps : []),
    ],
    [isLegal, isNatural]
  );

  if (loading) return <>Cargando...</>;

  return <SelfManagementComponents stepsComponents={stepsComponents} />;
};

const SelfManagement = () => {
  return (
    <>
      <Head>
        <title>Autogestión</title>
        <meta
          name="description"
          content="Formulario de autogestión del cliente"
        />
      </Head>
      <FormProvider>
        <Wrapper />
      </FormProvider>
    </>
  );
};

export default SelfManagement;

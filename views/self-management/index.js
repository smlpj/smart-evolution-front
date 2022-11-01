import { useContext, useMemo } from "react";

import Head from "next/head";

import { ClientType } from "@components/selects/queries";

import { useFetch } from "@hooks/useFetch";

import { FormContext, FormProvider } from "./Context";
import ClientTypeStep from "./Steps/ClientTypeStep";
import EmailStep from "./Steps/EmailStep";
import AddressStep from "./Steps/LegalSteps/AddressStep";
import CIIUStep from "./Steps/LegalSteps/CIIUStep";
import CityStep from "./Steps/LegalSteps/CityStep";
import ConstitutionDateStep from "./Steps/LegalSteps/ConstitutionDateStep";
import CountryStep from "./Steps/LegalSteps/CountryStep";
import CoverageStep from "./Steps/LegalSteps/CoverageStep";
import DepartmentStep from "./Steps/LegalSteps/DepartmentStep";
import EmployeesNumberStep from "./Steps/LegalSteps/EmployeesNumberStep";
import GreatContributorStep from "./Steps/LegalSteps/GreatContributorStep";
import IcaRateStep from "./Steps/LegalSteps/IcaRateStep";
import LegalRepBirthDateStep from "./Steps/LegalSteps/LegalRepBirthDateStep";
import LegalRepCitizenshipStep from "./Steps/LegalSteps/LegalRepCitizenshipStep";
import LegalRepDocumentNumberStep from "./Steps/LegalSteps/LegalRepDocumentNumberStep";
import LegalRepDocumentTypeStep from "./Steps/LegalSteps/LegalRepDocumentTypeStep";
import LegalRepLastNameStep from "./Steps/LegalSteps/LegalRepLastNameStep";
import LegalRepNameStep from "./Steps/LegalSteps/LegalRepNameStep";
import ManagementBoardStep from "./Steps/LegalSteps/ManagementBoardStep";
import NitStep from "./Steps/LegalSteps/NitStep";
import PhoneNumberStep from "./Steps/LegalSteps/PhoneNumberStep";
import RetentionRateStep from "./Steps/LegalSteps/RetentionRateStep";
import SelfRetainerStep from "./Steps/LegalSteps/SelfRetainerStep";
import ShareHoldersAndAssociatesStep from "./Steps/LegalSteps/ShareHoldersAndAssociatesStep";
import SocialObjectStep from "./Steps/LegalSteps/SocialObjectStep";
import SocialReasonStep from "./Steps/LegalSteps/SocialReasonStep";
import TemporalEmployeesNumberStep from "./Steps/LegalSteps/TemporalEmployeesNumberStep";
import LinkTypeStep from "./Steps/LinkTypeStep";
import StartStep from "./Steps/StartStep";
import { SelfManagement as SelfManagementComponents } from "./component";

const naturalSteps = [];
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
  { sectionId: 1, component: CIIUStep },
  { sectionId: 1, component: CoverageStep },
  { sectionId: 1, component: EmployeesNumberStep },
  { sectionId: 1, component: TemporalEmployeesNumberStep },
  { sectionId: 1, component: GreatContributorStep },
  { sectionId: 1, component: SelfRetainerStep },
  { sectionId: 1, component: IcaRateStep },
  { sectionId: 1, component: RetentionRateStep },
  { sectionId: 1, component: ManagementBoardStep },
  { sectionId: 1, component: ShareHoldersAndAssociatesStep },
  { sectionId: 1, component: LegalRepNameStep },
  { sectionId: 1, component: LegalRepLastNameStep },
  { sectionId: 1, component: LegalRepDocumentTypeStep },
  { sectionId: 1, component: LegalRepDocumentNumberStep },
  { sectionId: 1, component: LegalRepBirthDateStep },
  { sectionId: 1, component: LegalRepCitizenshipStep },
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

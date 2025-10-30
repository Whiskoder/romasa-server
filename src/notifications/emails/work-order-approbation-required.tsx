import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from "@react-email/components";

interface WorkOrderApprobationRequiredProps {
  recipientName: string;
  recipientEmail: string;
  reportLink: string;
  trackingCode: string;
}

export const WorkOrderApprobationRequired = ({
  recipientName,
  recipientEmail,
  reportLink,
  trackingCode,
}: WorkOrderApprobationRequiredProps) => {
  return (
    <Html>
      <Head />
      <Preview>Revisión y aprobación de orden de diagnóstico</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]'>
            <Heading className='text-[#333] text-2xl font-bold my-10'>
              Revisión y aprobación requerida
            </Heading>

            <Text className='text-[#333] text-sm my-6'>
              Hola {recipientName},
            </Text>

            <Text className='text-[#333] text-sm my-6'>
              Se ha generado una nueva orden de diagnóstico en la plataforma.
              Para continuar con el proceso, le solicitamos revisar los detalles
              y registrar su aprobación
            </Text>

            <Text className='text-[#333] text-sm my-6'>
              Código de seguimiento de la orden:
            </Text>

            <Text className='text-[#333] text-sm my-6 bg-zinc-200 p-4 rounded-md'>
              {trackingCode}
            </Text>

            <Button
              className='rounded bg-black px-5 py-3 text-center font-semibold text-sm text-white no-underline'
              href={reportLink}>
              Revisar y aprobar orden
            </Button>

            <Text className='text-[#898989] text-xs leading-[22px] mt-9 mb-6'>
              — Plataforma de taller | Herst
              <br />
              Este correo fue enviado a <strong>{recipientEmail}</strong> |{" "}
              <strong>{recipientName}</strong>.
              <br />
              Si no eres el destinatario previsto, puedes ignorar este mensaje.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WorkOrderApprobationRequired.PreviewProps = {
  recipientName: "Laura Gómez",
  recipientEmail: "laura.gomez@gmail.com",
  reportLink: "https://romasa-taller.mx/service-request/details/nJAYn892",
  trackingCode: "nJAYn892",
} as WorkOrderApprobationRequiredProps;

export default WorkOrderApprobationRequired;

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

interface WorkOrderApprovedEmailProps {
  recipientName: string;
  recipientEmail: string;
  reportLink: string;
  trackingCode: string;
}

export const WorkOrderApprovedEmail = ({
  recipientName,
  recipientEmail,
  reportLink,
  trackingCode,
}: WorkOrderApprovedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Orden de diagnóstico aprobada</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]'>
            <Heading className='text-[#333] text-2xl font-bold my-10'>
              Su orden de diagnóstico ha sido aprobada
            </Heading>

            <Text className='text-[#333] text-sm my-6'>
              Hola {recipientName},
            </Text>

            <Text className='text-[#333] text-sm my-6'>
              La orden de diagnóstico que registró fue aprobada. Puede consultar
              los detalles a continuación.
            </Text>

            <Text className='text-[#333] text-sm my-6'>
              Código de seguimiento:
            </Text>

            <Text className='text-[#333] text-sm my-6 bg-zinc-200 p-4 rounded-md'>
              {trackingCode}
            </Text>

            <Button
              className='rounded bg-black px-5 py-3 text-center font-semibold text-sm text-white no-underline'
              href={reportLink}>
              Ver detalles de la orden
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

// Ejemplo de vista previa
WorkOrderApprovedEmail.PreviewProps = {
  recipientName: "Laura Gómez",
  recipientEmail: "laura.gomez@gmail.com",
  reportLink: "https://romasa-taller.mx/service-request/details/nJAYn892",
  trackingCode: "nJAYn892",
} as WorkOrderApprovedEmailProps;

export default WorkOrderApprovedEmail;

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
  Link,
} from "@react-email/components";

interface SendUserPasswordEmailProps {
  recipientName: string;
  recipientEmail: string;
  loginLink: string;
  password: string;
}

export const SendUserPasswordEmail = ({
  recipientName,
  recipientEmail,
  loginLink,
  password,
}: SendUserPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Acceso a su cuenta — contraseña temporal</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]'>
            <Heading className='text-[#333] text-2xl font-bold my-10'>
              Invitación para registro
            </Heading>

            <Text className='text-[#333] text-sm my-6'>
              Hola {recipientName},
            </Text>

            <Text className='text-[#333] text-sm my-6'>
              Ya puede comenzar a utilizar su cuenta en{" "}
              <strong>Romasa Taller</strong>.
            </Text>

            <Text className='text-[#333] text-sm my-6'>Datos de acceso:</Text>

            <Text className='text-[#333] text-sm my-6 bg-zinc-200 p-4 rounded-md'>
              {recipientEmail}
            </Text>

            <Text className='text-[#333] text-sm my-6'>
              Utilice la siguiente contraseña temporal para iniciar sesión:
            </Text>

            <Text className='text-[#333] text-sm my-6 bg-zinc-200 p-4 rounded-md'>
              {password}
            </Text>

            <Button
              className='rounded bg-black px-5 py-3 text-center font-semibold text-sm text-white no-underline'
              href={loginLink}>
              Iniciar sesión
            </Button>

            <Text className='text-[#333] text-sm my-6'>
              Si el botón no funciona, copia y pega el siguiente enlace en tu
              navegador:
            </Text>

            <Link
              href={loginLink}
              target='_blank'
              className='text-[#2754C5] text-sm underline break-all'>
              {loginLink}
            </Link>

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
SendUserPasswordEmail.PreviewProps = {
  recipientName: "Laura Gómez",
  recipientEmail: "laura.gomez@gmail.com",
  loginLink: "https://romasa-taller.mx/auth/login",
  password: "nJAYn892",
} as SendUserPasswordEmailProps;

export default SendUserPasswordEmail;

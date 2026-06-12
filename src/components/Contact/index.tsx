import { useState, useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import Swal from 'sweetalert2';
import { usePortfolio } from '../../context/PortfolioContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { constants } = usePortfolio();
  const { lang } = constants;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        'service_4skexes',
        'template_yyr8hu5',
        form.current!,
        'b5Qpaip6jUCMtL4Uq',
      );
      const result = await Swal.fire({
        title: lang === 'es' ? '¡Formulario enviado!' : 'Form sent!',
        text:
          lang === 'es'
            ? 'Tu formulario ha sido enviado exitosamente.'
            : 'Your form has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      if (result.isConfirmed) {
        setOpen(true);
        form.current?.reset();
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text:
          lang === 'es'
            ? 'Ha ocurrido un error al enviar el formulario.'
            : 'An error occurred while sending the form.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>{lang === 'es' ? 'Contáctame' : 'Contact me'}</Title>
        <Desc>
          {lang === 'es'
            ? 'Quedo a la orden cualquier duda que tengas o cualquier oportunidad que podamos laborar juntos'
            : "I'm available for any questions you may have or any opportunity we can work together"}
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>
            {lang === 'es' ? 'Envíame un mensaje 🚀' : 'Send me a message 🚀'}
          </ContactTitle>
          <ContactInput
            placeholder={lang === 'es' ? 'Tu correo' : 'Your email'}
            name="from_email"
            type="email"
          />
          <ContactInput
            placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
            name="from_name"
          />
          <ContactInput placeholder={lang === 'es' ? 'Tema' : 'Subject'} name="subject" />
          <ContactInputMessage
            placeholder={lang === 'es' ? 'Mensaje' : 'Message'}
            rows={4}
            name="message"
          />
          <ContactButton type="submit">
            {lang === 'es' ? 'Enviar' : 'Send'}
          </ContactButton>
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={lang === 'es' ? '¡Correo enviado exitosamente!' : 'Email sent successfully!'}
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;

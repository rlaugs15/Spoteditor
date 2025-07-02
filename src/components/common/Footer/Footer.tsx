import ContactLink from './ContactLink';
import FooterPolicyLinks from './FooterPolicyLinks';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 bg-black text-text-sm web:text-text-md px-4 web:px-[50px] pt-[100px] web:pt-[200px] pb-10">
      <ContactLink />

      <div className="flex flex-col web:flex-row gap-3 justify-between text-light-600">
        <p>©2025 Spoteditor. All Rights are reserved️</p>
        <FooterPolicyLinks />
      </div>
    </footer>
  );
};

export default Footer;

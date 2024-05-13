import Logo from "../../Logo/Logo";
import { Footer } from "flowbite-react";

export default function FooterCom() {
    return (
        <Footer container>
        <div className="w-full text-center pt-12 bg-gray-50">
          <div className="flex items-center justify-between px-4 mx-auto max-w-screen-xl ">
            <Logo className="h-10"
            />
            <Footer.LinkGroup>
            <Footer.Link href="#" onClick={() => document.getElementById('accueil').scrollIntoView({ behavior: 'smooth' })}>Accueil</Footer.Link>
              <Footer.Link href="#" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Services</Footer.Link>
              <Footer.Link href="#" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="/" by="Ezzahraoui Sellam" year={2024} />
        </div>
      </Footer>

    );
}

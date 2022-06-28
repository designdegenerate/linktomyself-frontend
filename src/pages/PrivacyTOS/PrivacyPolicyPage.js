import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { selectUserProfile } from "../../store/user/selectors";
import MenuBar from "../HomePage/components/MenuBar";
import "./style.scss";

export default function PrivacyPolicyPage() {
  const getUser = useSelector(selectUserProfile);
  return (
    <main>
      {getUser ? <NavBar /> : <MenuBar />}
      <article className="privacy-tos">
        <h1>Privacy Policy</h1>
        <h2 id="what-information-do-we-collect">
          What information do we collect?
        </h2>
        <p>
          <strong>Basic account information</strong>: If you register on this
          server, you may be asked to enter a name, username, an e-mail address
          and a password. You may also enter additional profile information such
          as biography, and upload a profile picture and header image. With the
          exception of your email and password, all this information will be
          displayed publicly.
        </p>
        <p>
          <strong>Additional content</strong>: If you choose to add links fill
          in sections, this information will be displayed publicly. The date and
          time of when you filled this in may be stored in the database.
        </p>
        <p>
          <strong>IPs and other metadata</strong>: When you log in, we may record the IP address
          you log in from, as well as the name of your browser application. We
          also may retain server logs which include the IP address of every
          request to our server.
        </p>
        <h2 id="what-do-we-use-your-information-for">
          What do we use your information for?
        </h2>
        <p>
          Any of the information we collect from you may be used in the
          following ways:
        </p>
        <ul>
          <li>To provide the core functionality of Linktomyself.</li>
          <li>To aid moderation of the community, for example comparing your IP address with other known ones to determine ban evasion or other violations.</li>
          <li>The email address you provide may be used to send you information, notifications about other people interacting with your content or sending you messages, and to respond to inquiries, and/or other requests or questions.</li>
        </ul>
        <h2 id="how-do-we-protect-your-information">
          How do we protect your information?
        </h2>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information when you enter, submit, or access your
          personal information. Among other things, your browser session, as
          well as the traffic between your applications and the API, are secured
          with SSL, and your password is hashed using a strong one-way
          algorithm.
        </p>
        <h2 id="what-is-our-data-retention-policy">
          What is our data retention policy?
        </h2>
        <p>
          You can request and download an archive of your content displayed
          publicly on your page, and any personal information we store.
        </p>
        <p>You may irreversibly delete your account at any time.</p>
        <h2 id="do-we-use-cookies">Do we use cookies?</h2>
        <p>
          Yes. Cookies are small files that a site or its service provider
          transfers to your computer’s hard drive through your Web browser.
          These cookies enable the site to recognize your browser and, if you
          have a registered account, associate it with your registered account.
        </p>
        <p>We use cookies to determine whether you are logged in or not.</p>
        <h2 id="do-we-disclose-any-information-to-outside-parties">
          Do we disclose any information to outside parties?
        </h2>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information. This does not include trusted
          third parties who assist us in operating our site, conducting our
          business, or servicing you, so long as those parties agree to keep
          this information confidential. We may also release your information
          when we believe release is appropriate to comply with the law, enforce
          our site policies, or protect ours or others rights, property, or
          safety.
        </p>
        <p>Your public content may be downloaded by other servers or users.</p>
        <h2 id="site-usage-by-children">Site usage by children</h2>
        <p>
          If this server is in the EU or the EEA: Our site, products and
          services are all directed to people who are at least 16 years old. If
          you are under the age of 16, per the requirements of the{" "}
          <a href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation">
            GDPR (General Data Protection Regulation)
          </a>{" "}
          do not use this site.
        </p>
        <p>
          If this server is in the USA: Our site, products and services are all
          directed to people who are at least 13 years old. If you are under the
          age of 13, per the requirements of{" "}
          <a href="https://en.wikipedia.org/wiki/Children%27s_Online_Privacy_Protection_Act">
            COPPA (Children’s Online Privacy Protection Act)
          </a>{" "}
          do not use this site.
        </p>
        <p>
          Law requirements can be different if this server is in another
          jurisdiction.
        </p>
        <h2 id="changes-to-our-privacy-policy">
          Changes to our Privacy Policy
        </h2>
        <p>
          If we decide to change our privacy policy, we will post those changes
          on this page.
        </p>
        <p>This document is CC-BY-SA. It was last updated June 27, 2022.</p>
        <p>
          Originally adapted from the{" "}
          <a href="https://github.com/discourse/discourse">
            Discourse privacy policy
          </a>
          .
        </p>
        <p>
          As of 27 June, 2022, we have never received a National Security
          Letter, FISA order, or any other classified request for user
          information.
        </p>
      </article>
      <Footer />
    </main>
  );
}

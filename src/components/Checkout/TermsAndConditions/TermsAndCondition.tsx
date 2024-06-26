import React, { useState } from "react";
import './TermsAndConditions.scss';

export default function TermsAndCondition() {
  return (
    <div className="terms-and-condition-container">
      <div className="tnc_div">
        <p className="tnc_title">WEBSITE</p>
        <p className="tnc_body">
          The Website is meant to be used by bonafide User(s) for a lawful use.
          User shall not distribute exchange, modify, sell or transmit anything
          from the Website, including but not limited to any text, images, audio
          and video, for any business, commercial or public purpose. The User
          Agreement grants a limited, non-exclusive, non-transferable right to
          use this Website as expressly permitted in this User Agreement. The
          User agrees not to interrupt or attempt to interrupt the operation of
          the Website in any manner whatsoever. Access to certain features of
          the Website may only be available to registered User(s).
          
          <br/> 
          <br/>
          The process
          of registration, may require the User to answer certain questions or
          provide certain information that may or may not be personal in nature.
          Some such fields may be mandatory or optional. User represents and
          warrants that all information supplied to KDU is true and accurate.
          KDU reserves the right, in its sole discretion, to terminate the
          access to the Website and the services offered on the same or any
          portion thereof at any time, without notice, for general maintenance
          or any other reason whatsoever. KDU will always make its best
          endeavors to ensure that the content on its websites or other sales
          channels are free of any virus or such other malwares. However, any
          data or information downloaded or otherwise obtained through the use
          of the Website or any other Sales Channel is done entirely at the
          User's own discretion and risk and they will be solely responsible for
          any damage to their computer systems or loss of data that may result
          from the download of such data or information. 
          <br />
          <br/>
          <p>
          KDU reserves the right
          to periodically make improvements or changes in its Website at any
          time without any prior notice to the User. 
          </p>
        
          User(s) are requested to
          report any content on the Website which is deemed to be unlawful,
          objectionable, libelous, defamatory, obscene, harassing, invasive to
          privacy, abusive, fraudulent, against any religious beliefs, spam, or
          is violative of any applicable law to report@go-KDU.com. On receiving
          such report, KDU reserves the right to investigate and/or take such
          action as the Company may deem appropriate
        </p>
        <p className="tnc_bold_field">
        User(s) shall not host, display, upload, publish, transmit or share any information on KDU website or app which:
        </p>
        <div className="bullet-points">
                <div className="bullet-point">belongs to another person and to which the User does not have any right;</div>
                <div className="bullet-point">is obscene, pornographic, paedophilic, invasive of another’s privacy including bodily privacy, insulting or harassing on the basis of gender, racially or ethnically objectionable, relating or encouraging money laundering or gambling, or promoting enmity between different groups on the grounds of religion or caste with the intent to incite violence;</div>
                <div className="bullet-point">is harmful to child;</div>
                <div className="bullet-point">infringes any patent, trademark, copyright or other proprietary rights;</div>
                <div className="bullet-point">deceives or misleads the addressee about the origin of the message or knowingly and intentionally communicates any misinformation or information which is patently false and untrue or misleading in nature;</div>
                <div className="bullet-point">impersonates another person;</div>
                <div className="bullet-point">threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign States, or public order, or causes incitement to the commission of any cognisable offence, or prevents investigation of any offence, or is insulting other nation;</div>
                <div className="bullet-point">contains software virus or any other computer code, file or program designed to interrupt, destroy or limit the functionality of KDU’s platform;</div>
                <div className="bullet-point">violates any law for the time being in force;</div>
            </div>
      </div>
    </div>
  );
}

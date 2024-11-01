import styled from "styled-components";
import EmailIllustrationSrc from "../../../assets/img/email-illustration.svg"

const TextColumn = styled.div(props => `
  width: 100%;
  max-width: 100%;
  margin: auto;
  ${props.textOnLeft ? 'margin-right: 12rem; order: first;' : 'margin-left: 12rem; order: last;'}
  @media (min-width: 768px) {
    width: 58.33%;
  }
  margin-top: 4rem;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`);

const Image = styled.div(props => `
  background-image: url("${props.imageSrc}");
  border-radius: 0.5rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
`);

const Textarea = styled.textarea`
  margin-top: 1.5rem;
  border-bottom: 2px solid;
  padding: 0.75rem;
  font-weight: 500;
  transition: border-color 0.3s;
  height: 6rem;
  resize: none; /* Prevents resizing */
  &:focus {
    outline: none;
    border-color: var(--primary-500);
  }
  &:hover, &:focus {
    border-color: var(--primary-500);
  }
`;


const ContactUsForm = () => {
  return (
    <div className='relative'>
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24">
        <TextColumn textOnLeft={true}>
          <div className='lg:py-8 text-center md:text-left'>
            {/* <h5 className="font-bold text-primary-500 text-center md:text-left">Contact Us</h5> */}
            <h2 className='text-4xl sm:text-5xl font-black tracking-wide text-center mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight'>Feel free to <span className="text-primary-500 ">get in touch</span><wbr /> with us.</h2>
            <p className='mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary`-100`'>
              We blend the timeless principles of Feng Shui with the elegance of koi fish to bring harmony, prosperity, and tranquility to your home or business.
            </p>
            <form
  action="https://formspree.io/f/xpwzplwd"
  method="POST"
  className='mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0'
>
              <input type="email" name="email" placeholder='Your Email Address' className='mt-6 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hover:border-primary-500'/>
              <input type="text" name="name" placeholder='Full Name' className='mt-6 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hover:border-primary-500'/>
              <input type="text" name="subject" placeholder='Subject' className='mt-6 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hover:border-primary-500'/>
              <Textarea name="message" placeholder="Your Message Here" />
              <button className='px-8 py-3 font-bold rounded bg-primary-500 text-gray-500 hover:bg-primary-700 hover:text-gray-800 focus:shadow-outline focus:outline-none transition duration-300 inline-block mt-8' type="submit">Send</button>
            </form>
          </div>
        </TextColumn>
        <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-5/12 flex-shrink-0 h-80 md:h-auto">
          <Image imageSrc={EmailIllustrationSrc} />
        </div>
      </div>
    </div>
  )
}

export default ContactUsForm;

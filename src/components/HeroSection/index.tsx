import HeroBgAnimation from '../HeroBgAnimation';
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
} from './HeroStyle';
import HeroImg from '../../images/file.jpg';
import Typewriter from 'typewriter-effect';
import { usePortfolio } from '../../context/PortfolioContext';

const HeroSection = () => {
  const { constants } = usePortfolio();
  const { Bio, lang } = constants;

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              {lang === 'es' ? 'Hola,' : 'Hello,'} <br /> {Bio.name}
            </Title>
            <TextLoop>
              {lang === 'es' ? 'Yo soy' : 'I am'}
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{Bio.description}</SubTitle>
            <ResumeButton href={Bio.resume} target="display">
              {lang === 'es' ? 'Mira mis datos' : 'See my info'}
            </ResumeButton>
          </HeroLeftContainer>
          <HeroRightContainer id="Right">
            <Img src={HeroImg} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;

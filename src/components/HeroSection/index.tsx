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
  ResumeButtonWrapper,
} from './HeroStyle';
import HeroImg from '../../images/file.jpg';
import Typewriter from 'typewriter-effect';
import { usePortfolio } from '../../context/PortfolioContext';
import SpecularButton from '../SpecularButton';
import SplitText from '../SplitText';

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
              <SplitText
                text={lang === 'es' ? 'Hola,' : 'Hello,'}
                tag="span"
                splitType="chars"
                delay={40}
                duration={0.6}
                ease="power3.out"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="inherit"
              />
              <br />
              <SplitText
                text={Bio.name}
                tag="span"
                splitType="chars"
                delay={40}
                duration={0.6}
                ease="power3.out"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="inherit"
              />
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
            <ResumeButtonWrapper>
              <SpecularButton
                size="lg"
                radius={18}
                tint="#FCA311"
                tintOpacity={0.12}
                blur={6}
                textColor="#FCA311"
                lineColor="#FFE8B0"
                baseColor="#FCA311"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                onClick={() => window.open(Bio.resume, '_blank', 'noopener,noreferrer')}
              >
                {lang === 'es' ? 'Mira mis datos' : 'See my info'}
              </SpecularButton>
            </ResumeButtonWrapper>
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

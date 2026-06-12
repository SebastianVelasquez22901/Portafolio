import styled from 'styled-components';
import { ExpandMore } from '@mui/icons-material';
import type { Education } from '../../types';

const Card = styled.div<{ $open: boolean }>`
  width: 650px;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  box-shadow: ${({ $open }) =>
    $open
      ? 'rgba(23, 92, 230, 0.15) 0px 4px 24px'
      : '0 0 0 1.5px rgba(133, 76, 230, 0.55), rgba(133, 76, 230, 0.2) 0px 6px 28px'};
  border: ${({ $open }) => ($open ? '0.1px solid #854ce6' : '1px solid transparent')};
  background: ${({ theme }) => theme.card};
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
  }
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Header = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: linear-gradient(to bottom, #854ce6, #4db8ff);
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transition: opacity 0.35s ease;
  }
  &:hover { opacity: 0.9; }
  @media only screen and (max-width: 768px) { padding: 10px; }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  margin-top: 4px;
  flex-shrink: 0;
  @media only screen and (max-width: 768px) { height: 40px; }
`;

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + '99'};
  @media only screen and (max-width: 768px) { font-size: 14px; }
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + '99'};
  @media only screen and (max-width: 768px) { font-size: 12px; }
`;

const DateStyled = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + '80'};
  @media only screen and (max-width: 768px) { font-size: 10px; }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const CollapseHint = styled.span<{ $open: boolean }>`
  font-size: 11px;
  font-style: italic;
  color: ${({ theme }) => theme.primary};
  opacity: ${({ $open }) => ($open ? 0 : 0.75)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

const ChevronIcon = styled.div<{ $open: boolean }>`
  transition: transform 0.35s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
`;

const CollapseWrapper = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '400px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

const CollapsibleBody = styled.div`
  padding: 0 16px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media only screen and (max-width: 768px) { padding: 0 10px 10px 10px; }
`;

const Grade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + '99'};
  @media only screen and (max-width: 768px) { font-size: 12px; }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary + '99'};
  @media only screen and (max-width: 768px) { font-size: 12px; }
`;

interface EducationCardProps {
  education: Education;
  isOpen: boolean;
  onToggle: () => void;
}

const EducationCard = ({ education, isOpen, onToggle }: EducationCardProps) => {
  return (
    <Card $open={isOpen}>
      <Header $open={isOpen} onClick={onToggle}>
        <HeaderLeft>
          <Image src={education.img} alt={education.school} />
          <HeaderBody>
            <Name>{education.school}</Name>
            <Degree>{education.degree}</Degree>
            <DateStyled>{education.date}</DateStyled>
          </HeaderBody>
        </HeaderLeft>
        <HeaderRight>
          <CollapseHint $open={isOpen}></CollapseHint>
          <ChevronIcon $open={isOpen}>
            <ExpandMore fontSize="medium" />
          </ChevronIcon>
        </HeaderRight>
      </Header>
      <CollapseWrapper $open={isOpen}>
        <CollapsibleBody>
          <Grade>
            <b>Grado: </b>
            {education.grade}
          </Grade>
          <Description>{education.desc}</Description>
        </CollapsibleBody>
      </CollapseWrapper>
    </Card>
  );
};

export default EducationCard;

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { reset } from '../store/modules/myq';

const Header = styled.p`
  font-size: 2em;
`;
const Explaination = styled.p`
  font-size: 1.2em;
  color: #777;
`;
const Result = styled.p`
  font-size: 3em;
  color: black;
  margin-bottom: 0;
`;
const Additional = styled.p`
  font-size: 2em;
  color: #5170b5;
  font-style: italic;
`;
const AdditionalImg = styled.img`
  width: 270px;
  border-radius: 10px;
`;

const Mbti = styled.p`
  font-size: 1.5em;
`;

export default function Show() {
  const result = useSelector((state) => state.myq.myqResult);
  const explaination = useSelector((state) => state.myq.explaination[result]);
  const dispatch = useDispatch();

  //count 증가
  const incCounts = async () => {
    const resInc = await fetch('http://13.209.69.227:4000/mongo/inccount', {
      method: 'POST',
    });
    if (resInc.status === 200) {
      const incNum = await resInc.json();
    } else {
      throw new Error('통신이상');
    }
  };

  return (
    <>
      <Header>나와 닮은 오버워치 영웅은?</Header>
      <AdditionalImg src={explaination.img} alt="영웅 사진" />
      <Explaination>{explaination.text}</Explaination>
      <Result>{explaination.name}</Result>
      <Mbti>{result}</Mbti>
      <Additional>"{explaination.voice}"</Additional>
      <OrangeButton
        text="Restart"
        clickEvent={() => {
          incCounts();
          dispatch(reset());
        }}
      />
    </>
  );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { all_blocks_request } from '../../reducers/all';
import { pages_change, pages_color, pages_minus, pages_plus } from '../../reducers/pages';
import { Wrap, StyledLink } from '../Index';

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 610px;

    .last {
        border: none;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
`;

export const Header = styled.div`
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
`;

export const Title = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1400px;
    height: 50px;
    font-weight: bolder;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: 1px solid black;
    background-color: #e3e3e3;
`;

export const List = styled.div`
    display: flex;
    justify-content: space-around;
    width: 1400px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid black;
    background-color: whitesmoke;
`;

export const Span = styled.span`
    display: inline-block;
    text-align: center;
`;

export const Pages = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .page0,
    .page1,
    .page2,
    .page3,
    .page4,
    .page5,
    .page6,
    .page7,
    .page8,
    .page9 {
        background-color: #e1e1e1;
    }
`;

export const Btn = styled.button`
    width: 30px;
    height: 30px;
    margin: 0 10px;
    background-color: #c5c5c5;
    border: 1px solid #a1a1a1;
    border-radius: 10px;
    cursor: pointer;
`;

export const MainBtn = styled.button`
    width: 70px;
    height: 36px;
    font-size: 16px;
    font-weight: bolder;
    border: none;
    border-radius: 10px;
    background-color: #dddddd;
    cursor: pointer;
`;

const Blocks = () => {
    const dispatch = useDispatch();
    const { blocks } = useSelector((state) => state.all);
    const { current, move, point, flag, color } = useSelector((state) => state.pages);

    const numArr = [
        current,
        current + 1,
        current + 2,
        current + 3,
        current + 4,
        current + 5,
        current + 6,
        current + 7,
        current + 8,
        current + 9,
    ];

    let colorNum = 0;

    const plus = () => {
        if (numArr[9] * 10 < blocks.length) {
            for (let i = 0; i < 10; i++) numArr[i] = numArr[i] + 10;
            dispatch(pages_plus(numArr[0]));
        }
    };

    const minus = () => {
        if (numArr[0] > 10) {
            for (let i = 0; i < 10; i++) numArr[i] = numArr[i] - 10;
            dispatch(pages_minus(numArr[0]));
        }
    };

    const change = (v) => {
        colorNum = (v - 1) % 10;
        dispatch(pages_change(v));
        dispatch(pages_color(colorNum));
    };

    useEffect(() => {
        dispatch(all_blocks_request());
    }, [dispatch]);

    return (
        <Wrap>
            <Box>
                <Header>All Blocks</Header>
                <Title>
                    <Span style={{ width: '30px' }}>No.</Span>
                    <Span style={{ width: '50px' }}>Difficulty</Span>
                    <Span style={{ width: '570px' }}>Hash</Span>
                    <Span style={{ width: '340px' }}>Miner</Span>
                    <Span style={{ width: '140px' }}>Timestamp</Span>
                </Title>
                {blocks && flag === true
                    ? blocks.slice(move - 1, move + 9).map((v, i) => (
                          <List key={i} className={i === 9 && 'last'}>
                              <Span style={{ width: '30px' }}>{v.number}</Span>
                              <Span style={{ width: '50px' }}>{v.difficulty}</Span>
                              <StyledLink to={'/block/' + v.number}>
                                  <Span style={{ width: '570px' }}>{v.hash}</Span>
                              </StyledLink>
                              <Span style={{ width: '340px' }}>{v.miner}</Span>
                              <Span style={{ width: '140px' }}>{v.timestamp}</Span>
                          </List>
                      ))
                    : blocks.slice((point - 1) * 10, point * 10).map((v, i) => (
                          <List key={i} className={i === 9 && 'last'}>
                              <Span style={{ width: '30px' }}>{v.number}</Span>
                              <Span style={{ width: '50px' }}>{v.difficulty}</Span>
                              <StyledLink to={'/block/' + v.number}>
                                  <Span style={{ width: '570px' }}>{v.hash}</Span>
                              </StyledLink>
                              <Span style={{ width: '340px' }}>{v.miner}</Span>
                              <Span style={{ width: '140px' }}>{v.timestamp}</Span>
                          </List>
                      ))}
            </Box>
            <Pages>
                <Btn onClick={minus}>&lt;</Btn>
                {numArr.map((v, i) => (
                    <Btn onClick={() => change(v)} className={color === i && 'page' + i} key={i}>
                        {v}
                    </Btn>
                ))}
                <Btn onClick={plus}>&gt;</Btn>
            </Pages>
            <StyledLink
                to="/"
                style={{
                    margin: '20px auto 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70px',
                    height: '36px',
                }}
            >
                <MainBtn>Main</MainBtn>
            </StyledLink>
        </Wrap>
    );
};

export default Blocks;

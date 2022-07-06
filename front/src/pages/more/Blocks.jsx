import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { all_blocks_request } from '../../reducers/all';
import { pages_change, pages_minus, pages_plus } from '../../reducers/pages';
import { Wrap, StyledLink } from '../Index';

const Box = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 40px;
    border-bottom: 1px solid black;
`;

const List = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid black;
`;

const Span = styled.span`
    display: inline-block;
`;

const Pages = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const Btn = styled.button`
    width: 30px;
    height: 30px;
    margin: 0 10px;
    background-color: #cccccc;
    border: 1px solid #a1a1a1;
    border-radius: 10px;
    cursor: pointer;
`;

const Blocks = () => {
    const dispatch = useDispatch();
    const { blocks } = useSelector((state) => state.all);
    const { current, move, point, flag } = useSelector((state) => state.pages);

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
    const boolArr = Array(10).fill(false);

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
        dispatch(pages_change(v));
    };

    useEffect(() => {
        dispatch(all_blocks_request());
    }, [dispatch]);

    return (
        <Wrap>
            <Box>
                <Title>
                    <Span>No.</Span>
                    <Span>Difficulty</Span>
                    <Span>Hash</Span>
                    <Span>Miner</Span>
                    <Span>timestamp</Span>
                </Title>
                {blocks && flag === true
                    ? blocks.slice(move - 1, move + 9).map((v, i) => (
                          <List key={i}>
                              <Span>{v.number}</Span>
                              <Span>{v.difficulty}</Span>
                              <Span>{v.hash}</Span>
                              <Span>{v.miner}</Span>
                              <Span>{v.timestamp}</Span>
                          </List>
                      ))
                    : blocks.slice((point - 1) * 10, point * 10).map((v, i) => (
                          <List key={i}>
                              <Span>{v.number}</Span>
                              <Span>{v.difficulty}</Span>
                              <StyledLink to={'/block/' + v.number}>
                                  <Span>{v.hash}</Span>
                              </StyledLink>
                              <Span>{v.miner}</Span>
                              <Span>{v.timestamp}</Span>
                          </List>
                      ))}
            </Box>
            <Pages>
                <Btn onClick={minus}>&lt;</Btn>
                {numArr.map((v, i) => (
                    <Btn onClick={() => change(v)} key={i}>
                        {v}
                    </Btn>
                ))}
                <Btn onClick={plus}>&gt;</Btn>
            </Pages>
        </Wrap>
    );
};

export default Blocks;

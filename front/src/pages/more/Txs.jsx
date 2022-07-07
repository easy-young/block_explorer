import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { all_txs_request } from '../../reducers/all';
import { pages_change, pages_color, pages_minus, pages_plus } from '../../reducers/pages';
import { Wrap, StyledLink } from '../Index';
import { Box, Header, Title, List, Span, Pages, Btn, MainBtn } from './Blocks';

const Txs = () => {
    const dispatch = useDispatch();
    const { txs } = useSelector((state) => state.all);
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
        if (numArr[9] * 10 < txs.length) {
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
        dispatch(all_txs_request());
    }, [dispatch]);

    return (
        <Wrap>
            <Box>
                <Header>All Transactions</Header>
                <Title>
                    <Span style={{ width: '50px' }}>Block</Span>
                    <Span style={{ width: '310px' }}>From</Span>
                    <Span style={{ width: '310px' }}>To</Span>
                    <Span style={{ width: '570px' }}>Tx Hash</Span>
                    <Span style={{ width: '50px' }}>Index</Span>
                </Title>
                {txs && flag === true
                    ? txs.slice(move - 1, move + 9).map((v, i) => (
                          <List key={i} className={i === 9 && 'last'}>
                              <Span style={{ width: '50px' }}>{v.blockNumber}</Span>
                              <Span style={{ width: '310px' }}>{v.sender.slice(0, 30)}...</Span>
                              <Span style={{ width: '310px' }}>{v.receiver.slice(0, 30)}...</Span>
                              <Span style={{ width: '570px' }}>{v.transactionHash.slice(0, 55)}...</Span>
                              <Span style={{ width: '50px' }}>{v.transactionIndex}</Span>
                          </List>
                      ))
                    : txs.slice((point - 1) * 10, point * 10).map((v, i) => (
                          <List key={i} className={i === 9 && 'last'}>
                              <Span style={{ width: '50px' }}>{v.blockNumber}</Span>
                              <Span style={{ width: '310px' }}>{v.sender.slice(0, 30)}...</Span>
                              <Span style={{ width: '310px' }}>{v.receiver.slice(0, 30)}...</Span>
                              <Span style={{ width: '570px' }}>{v.transactionHash.slice(0, 55)}...</Span>
                              <Span style={{ width: '50px' }}>{v.transactionIndex}</Span>
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

export default Txs;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { latest_request } from '../reducers/latest';

const Header = styled.header`
    display: flex;
    justify-content: center;
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
`;

const Latest = styled.div`
    width: 600px;
`;

const H3 = styled.h3`
    text-align: center;
`;

const Info = styled.div`
    height: 60px;
    padding: 4px;
    border: 1px solid black;
    box-sizing: border-box;
`;

const Span = styled.div`
    display: inline-block;
`;

const StyledLink = styled(Link)`
    color: black;
`;

const Index = () => {
    const dispatch = useDispatch();
    const { latest } = useSelector((state) => state);

    useEffect(() => {
        dispatch(latest_request());
    }, [dispatch]);
    return (
        <>
            <Header>Jenny's Block Explorer</Header>
            <Box>
                <Latest>
                    <H3>Latest Block</H3>
                    <Info>
                        <Span style={{ width: '50px', textAlign: 'center' }}>Bk</Span>
                        <Span style={{ width: '80px' }}>No.</Span>
                        <Span style={{ width: '140px' }}>Miner</Span>
                        <Span style={{ width: '50px', float: 'right', textAlign: 'center' }}>Gas</Span>
                    </Info>
                    {latest &&
                        latest.blocks.map((v, i) => (
                            <Info key={i}>
                                <Span style={{ width: '50px', textAlign: 'center' }}>Bk</Span>
                                <StyledLink to={'/block/' + v.number}>
                                    <Span style={{ width: '80px' }}>{v.number}</Span>
                                </StyledLink>
                                <Span style={{ width: '140px' }}>{v.miner}</Span>
                                <Span style={{ width: '50px', float: 'right', textAlign: 'center' }}>{v.gasUsed}</Span>
                            </Info>
                        ))}
                </Latest>
                <Latest>
                    <H3>Latest Transaction</H3>
                    <Info>
                        <Span style={{ width: '50px', textAlign: 'center' }}>Tx</Span>
                        <Span style={{ width: '120px' }}>Hash</Span>
                        <Span style={{ width: '250px' }}>Account</Span>
                        <Span style={{ width: '50px', float: 'right', textAlign: 'center' }}>Block</Span>
                    </Info>
                    {latest &&
                        latest.txs.map((v, i) => (
                            <Info key={i}>
                                <Span style={{ width: '50px', textAlign: 'center' }}>Tx</Span>
                                <StyledLink to={'/tx/' + v.transactionHash}>
                                    <Span style={{ width: '120px' }}>{v.transactionHash.slice(0, 10)}...</Span>
                                </StyledLink>
                                <Span style={{ width: '250px' }}>
                                    <div>From: {v.sender.slice(0, 20)}...</div>
                                    <div>To: {v.receiver.slice(0, 20)}...</div>
                                </Span>
                                <Span style={{ width: '50px', float: 'right', textAlign: 'center' }}>{v.blockNumber}</Span>
                            </Info>
                        ))}
                </Latest>
            </Box>
        </>
    );
};

export default Index;

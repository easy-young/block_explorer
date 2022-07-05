import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { create_request } from '../reducers/create';
import { latest_request } from '../reducers/latest';

export const Wrap = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #b5b5b5;
`;

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
    margin: 0 20px;
    height: 54px;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    background-color: whitesmoke;
`;

const More = styled.div`
    margin: 0 20px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #e3e3e3;
    box-sizing: border-box;
`;

const Span = styled.span`
    display: inline-block;
    line-height: 54px;
`;

const Span2 = styled.span`
    display: inline-block;
    position: absolute;
    width: 250px;
    margin-top: 6px;
`;

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`;

const Index = () => {
    const dispatch = useDispatch();
    const { latest } = useSelector((state) => state);

    useEffect(() => {
        dispatch(create_request());
        dispatch(latest_request());
    }, [dispatch]);

    return (
        <Wrap>
            <Header>Jenny's Block Explorer</Header>
            <Box>
                <Latest>
                    <H3>Latest Blocks</H3>
                    <Info
                        style={{
                            backgroundColor: '#e3e3e3',
                            fontWeight: 'bolder',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }}
                    >
                        <Span style={{ width: '50px', textAlign: 'center' }}>Bk</Span>
                        <Span style={{ width: '60px' }}>No.</Span>
                        <Span style={{ width: '140px' }}>Miner</Span>
                        <Span style={{ width: '50px', float: 'right', textAlign: 'center' }}>Gas</Span>
                    </Info>
                    {latest &&
                        latest.blocks.map((v, i) => (
                            <Info key={i}>
                                <Span style={{ width: '50px', textAlign: 'center' }}>Bk</Span>
                                <StyledLink to={'/block/' + v.number}>
                                    <Span style={{ width: '60px' }}>{v.number}</Span>
                                </StyledLink>
                                <Span style={{ width: '140px' }}>{v.miner}</Span>
                                <Span style={{ width: '50px', float: 'right', textAlign: 'center' }}>{v.gasUsed}</Span>
                            </Info>
                        ))}
                    <StyledLink to="/more/block">
                        <More>More Blocks</More>
                    </StyledLink>
                </Latest>
                <Latest>
                    <H3>Latest Transactions</H3>
                    <Info
                        style={{
                            backgroundColor: '#e3e3e3',
                            fontWeight: 'bolder',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }}
                    >
                        <Span style={{ width: '50px', textAlign: 'center' }}>Tx</Span>
                        <Span style={{ width: '130px' }}>Hash</Span>
                        <Span style={{ width: '250px' }}>Account</Span>
                        <Span style={{ width: '50px' }}>Index</Span>
                        <Span style={{ width: '60px', marginLeft: '10px' }}>Block</Span>
                    </Info>
                    {latest &&
                        latest.txs.map((v, i) => (
                            <Info key={i}>
                                <Span style={{ width: '50px', textAlign: 'center' }}>Tx</Span>
                                <StyledLink to={'/tx/' + v.transactionHash}>
                                    <Span style={{ width: '130px' }}>{v.transactionHash.slice(0, 10)}...</Span>
                                </StyledLink>
                                <Span2>
                                    <div style={{ lineHeight: '14px' }}>From : {v.sender.slice(0, 20)}...</div>
                                    <div style={{ lineHeight: '14px', marginTop: '10px' }}>To : {v.receiver.slice(0, 20)}...</div>
                                </Span2>
                                <Span style={{ width: '50px', marginLeft: '260px' }}>{v.transactionIndex}</Span>
                                <Span style={{ width: '60px', marginLeft: '10px' }}>{v.blockNumber}</Span>
                            </Info>
                        ))}
                    <StyledLink to="/more/tx">
                        <More>More Transactions</More>
                    </StyledLink>
                </Latest>
            </Box>
        </Wrap>
    );
};

export default Index;

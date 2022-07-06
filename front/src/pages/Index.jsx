import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { create_request } from '../reducers/create';
import { latest_request } from '../reducers/latest';
import axios from 'axios';

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
    height: 40px;
    padding: 14px;
    font-size: 30px;
    font-weight: bolder;
`;

const Search = styled.div`
    display: flex;
    margin: 0 auto 6px;
    width: 1180px;
    height: 50px;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #9d9d9d;
`;

const Select = styled.select`
    width: 160px;
    height: 40px;
    padding: 0 6px;
    font-size: 18px;
    border-radius: 10px;
    border: none;
`;

const Option = styled.option`
    //
`;

const Input = styled.input`
    width: 870px;
    height: 40px;
    margin: auto 10px;
    padding: 0 10px;
    font-size: 18px;
    border-radius: 10px;
    border: none;
`;

const Submit = styled.input`
    width: 100px;
    height: 40px;
    font-size: 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
`;

const Half = styled.div``;

const Latest = styled.div`
    height: 420px;
    overflow-y: auto;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const H3 = styled.h3`
    text-align: center;
`;

const Info = styled.div`
    margin: 0 20px;
    height: 54px;
    border-bottom: 1px solid #797979;
    box-sizing: border-box;
    background-color: whitesmoke;
`;

const Info2 = styled(Info)`
    display: flex;
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
    text-align: center;
`;

const Span2 = styled.span`
    display: inline-block;
    width: 260px;
    margin-top: 6px;
`;

export const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`;

const Index = () => {
    const dispatch = useDispatch();
    const { latest } = useSelector((state) => state);

    const submitHandler = async (e) => {
        e.preventDefault();
        const { selection, search } = e.target;

        switch (selection.value) {
            case 'blockNumber':
                if (search.value === '') break;
                const result = await axios.post('http://localhost:4000/search/blockNumber', { number: search.value });
                if (result.data.count > 0) window.location.href = 'http://localhost:3000/block/' + search.value;
                else window.alert('해당 블록이 존재하지 않습니다.');
                break;
            case 'blockHash':
                if (search.value.length !== 66) {
                    window.alert('Block Hash의 길이가 올바르지 않습니다.');
                    break;
                }
                const result2 = await axios.post('http://localhost:4000/search/blockHash', { blockHash: search.value });
                if (result2 === undefined) window.alert('존재하지 않는 Block Hash입니다.');
                else window.location.href = 'http://localhost:3000/block/' + result2.data.number;
                break;
            case 'txHash':
                console.log(search.value.length);
                if (search.value.length !== 66) {
                    window.alert('Tx Hash의 길이가 올바르지 않습니다.');
                    break;
                }
                const result3 = await axios.post('http://localhost:4000/search/txHash', { txHash: search.value });
                if (result3 === undefined) window.alert('존재하지 않는 Tx Hash입니다.');
                else window.location.href = 'http://localhost:3000/tx/' + search.value;
                break;
            // case 'miner':
            //     if (search.value.length !== 42) {
            //         window.alert('Miner Hash의 길이가 올바르지 않습니다.');
            //         break;
            //     }
            //     const result4 = await axios.post('http://localhost:4000/search/miner', { miner: search.value });
            //     break;
            default:
                break;
        }
    };

    useEffect(() => {
        dispatch(create_request());
        dispatch(latest_request());
    }, [dispatch]);

    return (
        <Wrap>
            <Header>Jenny's Blockchain Explorer</Header>
            <Search>
                <Form onSubmit={submitHandler}>
                    <Select id="selection">
                        <Option value="blockNumber">Block Number</Option>
                        <Option value="blockHash">Block Hash</Option>
                        <Option value="txHash">Tx Hash</Option>
                        {/* <Option value="miner">Miner</Option> */}
                    </Select>
                    <Input type="text" id="search" placeholder="Search by Block Number / Block Hash / Tx Hash" />
                    <Submit type="submit" id="submit" value="Search" />
                </Form>
            </Search>
            <Box>
                <Half>
                    <H3>Latest Blocks</H3>
                    <Info
                        style={{
                            backgroundColor: '#e3e3e3',
                            fontWeight: 'bolder',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }}
                    >
                        <Span style={{ width: '50px' }}>Bk</Span>
                        <Span style={{ width: '60px' }}>No.</Span>
                        <Span style={{ width: '400px' }}>Miner</Span>
                        <Span style={{ width: '80px', float: 'right' }}>Gas</Span>
                    </Info>
                    <Latest>
                        {latest &&
                            latest.blocks.map((v, i) => (
                                <Info key={i}>
                                    <Span style={{ width: '50px' }}>Bk</Span>
                                    <StyledLink to={'/block/' + v.number}>
                                        <Span style={{ width: '60px' }}>{v.number}</Span>
                                    </StyledLink>
                                    <Span style={{ width: '400px' }}>{v.miner.slice(0, 35)}...</Span>
                                    <Span style={{ width: '80px', float: 'right' }}>{v.gasUsed}</Span>
                                </Info>
                            ))}
                    </Latest>
                    <StyledLink to="/more/block">
                        <More>More Blocks</More>
                    </StyledLink>
                </Half>
                <Half>
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
                    <Latest>
                        {latest &&
                            latest.txs.map((v, i) => (
                                <Info2 key={i}>
                                    <Span style={{ width: '50px', textAlign: 'center' }}>Tx</Span>
                                    <StyledLink to={'/tx/' + v.transactionHash}>
                                        <Span style={{ width: '130px' }}>{v.transactionHash.slice(0, 10)}...</Span>
                                    </StyledLink>
                                    <Span2>
                                        <div style={{ lineHeight: '14px' }}>From : {v.sender.slice(0, 20)}...</div>
                                        <div style={{ lineHeight: '14px', marginTop: '10px' }}>To : {v.receiver.slice(0, 20)}...</div>
                                    </Span2>
                                    <Span style={{ width: '50px' }}>{v.transactionIndex}</Span>
                                    <Span style={{ width: '60px' }}>{v.blockNumber}</Span>
                                </Info2>
                            ))}
                    </Latest>
                    <StyledLink to="/more/tx">
                        <More>More Transactions</More>
                    </StyledLink>
                </Half>
            </Box>
        </Wrap>
    );
};

export default Index;

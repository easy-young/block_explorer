import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { block_request } from '../reducers/block';

export const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #777777;
`;

export const Box = styled.div`
    width: 800px;
    height: 680px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #eeeeee;
    border-radius: 20px;
`;

export const Div = styled.div`
    width: 700px;
`;

export const StyledLink = styled(Link)`
    width: 80px;
    height: 36px;
    color: black;
    text-align: center;
    line-height: 36px;
    text-decoration: none;
    background-color: #dddddd;
    border-radius: 10px;
`;

const Block = () => {
    const dispatch = useDispatch();
    const { block } = useSelector((state) => state);
    const { idx } = useParams();

    useEffect(() => {
        dispatch(block_request(idx));
    }, [dispatch]);

    return (
        <Container>
            {block && (
                <Box>
                    <Div style={{ fontWeight: 'bolder', borderBottom: '1px solid black' }}>Block {block.number}</Div>
                    <Div>difficulty : {block.difficulty}</Div>
                    <Div>extraData : {block.extraData}</Div>
                    <Div>gasLimit : {block.gasLimit}</Div>
                    <Div>gasUsed : {block.gasUsed}</Div>
                    <Div>hash : {block.hash}</Div>
                    <Div>miner : {block.miner}</Div>
                    <Div>mixHash : {block.mixHash}</Div>
                    <Div>nonce : {block.nonce}</Div>
                    <Div>parentHash : {block.parentHash}</Div>
                    <Div>receiptsRoot : {block.receiptsRoot}</Div>
                    <Div>sha3Uncles : {block.sha3Uncles}</Div>
                    <Div>size : {block.size}</Div>
                    <Div>stateRoot : {block.stateRoot}</Div>
                    <Div>timestamp : {block.timestamp}</Div>
                    <Div>totalDifficulty: {block.totalDifficulty}</Div>
                    <Div>transactionsRoot : {block.transactionsRoot}</Div>
                    <div style={{ display: 'flex' }}>
                        <StyledLink to="/" style={{ marginRight: '15px' }}>
                            Main
                        </StyledLink>
                        <StyledLink to="/more/block">Back</StyledLink>
                    </div>
                </Box>
            )}
        </Container>
    );
};

export default Block;

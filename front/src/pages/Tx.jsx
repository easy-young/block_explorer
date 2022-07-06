import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { tx_request } from '../reducers/tx';
import { Container, Box, Div, StyledLink } from './Block';

const Tx = () => {
    const dispatch = useDispatch();
    const { tx } = useSelector((state) => state);
    const { idx } = useParams();

    useEffect(() => {
        dispatch(tx_request(idx));
    }, [dispatch]);

    return (
        <Container>
            {tx && (
                <Box>
                    <Div style={{ fontWeight: 'bolder', borderBottom: '1px solid black' }}>txHash : {tx.transactionHash}</Div>
                    <Div>blockHash : {tx.blockHash}</Div>
                    <Div>blockNumber : {tx.blockNumber}</Div>
                    <Div>contractAddress : {tx.contractAddress}</Div>
                    <Div>cumulativeGasUsed : {tx.cumulativeGasUsed}</Div>
                    <Div>gasPrice : {tx.gasPrice}</Div>
                    <Div>from : {tx.sender}</Div>
                    <Div>gasUsed : {tx.gasUsed}</Div>
                    <Div>status : {tx.status}</Div>
                    <Div>to : {tx.receiver}</Div>
                    <Div>transactionIndex : {tx.transactionIndex}</Div>
                    <Div>type : {tx.type}</Div>
                    <StyledLink to="/">Main</StyledLink>
                </Box>
            )}
        </Container>
    );
};

export default Tx;

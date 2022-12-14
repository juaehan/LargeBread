import React, { memo,useEffect  } from 'react';
import styled from 'styled-components';
import DelButton from './DelButton';
import PayButton from './PayButton';
import {TotalPrice} from '../slices/BasketSlice';
import { useDispatch, useSelector } from 'react-redux';

const ButtonContainer = styled.div`
    width: 30%;
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    .totalPay{
        width: 90%;
        height: 33.3%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: auto;
    .system-info{
        width: 100%;
        height: 33.3%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        font-weight: 700;
        font-size: 14px;

        h3,
        p{
            padding-right:15px;
            font-size: 16px;
            b{
                color: #ae2a2f;
                font-size: 24px;
                font-weight: 900;
            }
            
        }
    }
    }
`;

const ItemBox = memo(() => {
    useEffect(()=>console.clear(),[]);
    const basket = useSelector((state)=>state.basket);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(TotalPrice())
    },[basket, dispatch]);

    
    return (
        <ButtonContainer>
            <div className='totalPay'>
            <div className='system-info'>
                <h3>총 결재금액</h3>
                <p><b>{basket.basketTotalAmount.toLocaleString()}</b>원</p>
            </div>
            </div>
            <DelButton/>
            <PayButton/>
        </ButtonContainer>
    );
});

export default ItemBox;
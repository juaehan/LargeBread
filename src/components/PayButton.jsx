import React, { memo, useCallback,useEffect } from 'react';
import styled from "styled-components";
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { addCart } from '../slices/BasketSlice';


const PayBtn = styled.form`
    width: 90%;
    margin: auto;
    text-align: center;
    height: 33.3%;
    display: flex;
    align-items: center;
    .item-payBtn{
        align-items: center;
        background-color: #d9d8d8;
        color: black;
        width: 100%;
        height: 90%;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        .submitBtn{
          border: none;
          font-size: 15px;
          font-weight: 700;
          background-color: inherit;
          color: inherit;
        }
        &:hover{
            background-color: #fec24a;
            color: white;
        }
    }
`;
const PayButton = memo(({id, amount}) => {
    const PaySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const basket = useSelector((state) => state.basket);
    console.log(basket);
 console.log(basket.basketItems[0].id);
    const dispatch = useDispatch();
    
    // Promise 방식을 사용한 다이얼로그
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        let timerInterval

        PaySwal.fire({
            title: '결제중 입니다.',
            html: '잠시만 기다려주세요.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
          
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                
              dispatch(addCart({
                product_id: basket.basketItems[0].id,
                amount: basket.basketQuantity
              }))
              navigate('/');
              PaySwal.fire({
                icon: 'success',
                title:'결제가 완료되었습니다.'
              });
            }
          })
    }, [PaySwal,navigate,dispatch]);
    return (
        <PayBtn >
          <div onClick={onSubmit} className='item-payBtn'>
            <input className='submitBtn' name='submit' value="결제하기" type="submit"/>
            </div>
        </PayBtn>
    );
});

export default PayButton;
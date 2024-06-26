import { Checkbox, FormControl, FormControlLabel, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import {  setPromotionsStr } from '../../../redux/slice/TenantPersonalSlice';
import axios from 'axios';
import { IPromotions } from '../PromotionsConfig/PromotionsConfig';
import LoaderDate from '../../Loader/LoaderDate';
import './PromotionByRoom.scss'
import { FormattedMessage } from 'react-intl';

export default function () {
    const [loader,setLoader] = useState(false);
    const { propertyName } = useSelector((state: RootState) => state.bookingFormList);
    const { promotionsStr } = useSelector((state: RootState) => state.tenantPersonalList);
    const [promotionsUpdated, setPromotions] = useState<IPromotions[]>([]);
    const { roomType } = useSelector((state: RootState) => state.tenantRoomList);
    const dispatch = useDispatch<APPDispatch>();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, promotionTitle: string) => {
        const updatedPromotions = promotionsUpdated.map((promotion:IPromotions) =>
            promotion.promotionTitle === promotionTitle ? { ...promotion, deactivated: !promotion.deactivated } : promotion
        );
        let updatedStr : string[] = [];
        updatedPromotions.map((promotion: IPromotions) => {
            updatedStr.push(promotion.promotionTitle + ',' + promotion.promotionDescription + ',' + promotion.priceFactor + ',' + promotion.minDays + ',' + promotion.deactivated);
        })
        setPromotions(updatedPromotions);
        dispatch(setPromotionsStr(updatedStr));
    }

    useEffect(() => {
        console.log(promotionsStr);
    },[promotionsStr])

    useEffect(() => {
        const fetchPromotionsByRoomTypes = async () => {
            try {
                setLoader(true);
                const response = await axios.get(import.meta.env.VITE_PROMOTION_BY_ROOM_TYPE, {
                    params: {
                        propertyName: propertyName,
                        roomType: roomType
                    }
                });
                setPromotions(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }

        if (roomType.length > 0) fetchPromotionsByRoomTypes();
    }, [roomType]);

    return (
        <div>
            <div className='disable-enable-promo'>  <FormattedMessage id="app.promotions" defaultMessage="promotions" /></div>
            {loader && <LoaderDate/>}
            <div>
                <FormControl>
                    {
                        promotionsUpdated.map((promotion) => (
                            <FormControlLabel
                                key={promotion.promotionTitle} 
                                control={
                                    <Checkbox
                                        checked={!promotion.deactivated} 
                                        onChange={(event) => handleCheckboxChange(event, promotion.promotionTitle)}
                                    />
                                }
                                label={promotion.promotionTitle + `(${promotion.priceFactor})`} 
                            />
                        ))
                    }
                </FormControl>
            </div>
        </div>
    );
}

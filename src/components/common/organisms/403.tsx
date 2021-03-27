import { Result, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHeader from './SimpleHeader';

export default function Result404(){
    return (
        <>
            <SimpleHeader/>
            <Result
                status="403"
                title="403"
                subTitle="アクセスが拒否されました"
                extra={
                    <Button
                        type="primary"
                    >
                    <Link to="">トップへ戻る</Link>
                    </Button>}
            />
        </>
    )
}
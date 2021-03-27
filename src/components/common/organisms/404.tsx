import { Result, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHeader from './SimpleHeader';

export default function Result404(){
    return (
        <>
            <SimpleHeader/>
            <Result
                status="404"
                title="404"
                subTitle="お探しのページが見つかりません"
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
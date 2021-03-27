import { Result, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { routeBuilder } from 'router';
import SimpleHeader from './SimpleHeader';

type PropsType = {
    error: any
}

export default function Result500(props: PropsType){
    console.error(props.error);

    return (
        <>
            <SimpleHeader/>
            <Result
                status="500"
                title="500"
                subTitle="内部エラーが発生しました。"
                extra={
                    <>
                        <Button
                            type="primary"
                        >
                            <Link to={routeBuilder.topPath()}>トップへ戻る</Link>
                        </Button>
                    </>
                }
            />
        </>
    )
}
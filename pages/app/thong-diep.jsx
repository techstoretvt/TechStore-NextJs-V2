import React from 'react'
import { nameWeb } from '../../utils/constants';
import { useRouter } from 'next/router'
import Head from 'next/head';

function ThongDiep() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Thông điệp online | {nameWeb}</title>
                <meta name="description" content={`Gửi thông điệp online thông qua ${nameWeb}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ color: '#fff', fontSize: '30px' }}>
                {
                    router?.query?.content
                }
            </div>
        </>
    )
}

export default ThongDiep
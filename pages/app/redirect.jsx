import React, { useEffect } from 'react'
import Head from "next/head";
import { nameWeb } from '../../utils/constants';
import { useRouter } from 'next/router'

function RedirectLink() {
    const router = useRouter();
    console.log(router);

    useEffect(() => {
        if (router?.query?.url) {
            console.log('redirect');
            router.push(router.query.url)
        }

    }, [router])

    return (
        <>
            <Head>
                <title>Redirect Link | {nameWeb}</title>
                <meta name="description" content={`Chuyển hướng từ ${nameWeb}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>RedirectLink</div>
        </>
    )
}

export default RedirectLink
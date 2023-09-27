import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Quark Sb</title>
                <link rel="icon" href="/logo.ico" />
            </Head>

            <main>
                <Image style={{ borderRadius: "50%" }} src="/portrait.jpeg" width={400} height={400} alt={"portrait"} />

                <p className={styles.description}>A programmer with a sense of justice, but struggling to make ends meet, Please contact me for any opportunities to "run".</p>

                <div className={styles.grid}>
                    <a href="https://github.com/quarksb" className={styles.card}>
                        <h3>GitHub &rarr;</h3>
                        <p>A mediocre programmer.</p>
                    </a>
                    <a href="https://www.figma.com/@quark_cao" className={styles.card}>
                        <h3>Figma &rarr;</h3>
                        <p>A plugin creator.</p>
                    </a>
                    <a href="https://twitter.com/quark_china" className={styles.card}>
                        <h3>Twitter &rarr;</h3>
                        <p>An unknown person.</p>
                    </a>
                </div>
            </main>

            <style jsx>{`
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                footer img {
                    margin-left: 0.5rem;
                }
                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}

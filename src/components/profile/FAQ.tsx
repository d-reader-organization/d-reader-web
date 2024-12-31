'use client'

import React from 'react'
import { Expandable } from '@/components/shared/Expandable'
import { ExpandableText } from '@/components/shared/ExpandableText'
import { Text } from '../ui'
import Link from 'next/link'
import { SUPPORT_EMAIL } from '@/constants/general'

const FAQ: React.FC = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Text as='h4' styleVariant='secondary-heading'>
          Frequent Questions
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200'>
          If you&apos;d like to report your bug use the &nbsp;
          <span className='text-important-color'>
            <Link href='https://forms.gle/pXH2DFaVPyquv1Yv9'>bug report form</Link>
          </span>
        </Text>
      </div>
      <div className='flex flex-col gap-8'>
        <div>
          <Text as='p' styleVariant='body-large' className='font-bold mb-2'>
            GET STARTED
          </Text>
          <Expandable title='📚 I love comics! Where do I start?' id='get-started'>
            <ExpandableText text='1. First make sure to register to the app!' />
            <ExpandableText text="2. If you're on Android mobile, download dReader on Google Play." />
            <ExpandableText text="3. If you're using our web app, go to this dReader register link." />
            <span className='text-grey-100 italic'>
              Visit our{' '}
              <Link href='https://dreader.io/links' className='text-important-color font-bold underline'>
                linkree
              </Link>{' '}
              to learn more about what we do.
            </span>
          </Expandable>

          <Expandable title='🤔 Where can I learn more about the project?' id='learn-more'>
            <ExpandableText text='To learn more about the project, visit our linkree and take a look at our pitch deck!' />
          </Expandable>

          <Expandable title='📱 How do I buy the comic on the mobile app?' id='buy-on-mobile-app'>
            <ExpandableText text='Our mobile app is currently only available on Android.' />
            <ol className='list-decimal list-inside pl-5'>
              <li>Go to the mobile app.</li>
              <li>
                <span className='text-important-color'>Make sure your email is verified</span> by going to&nbsp;
                <em>settings -&gt; profile</em>.
              </li>
              <li>Find the comic you&apos;d like to buy (usually promoted on the homepage banner).</li>
              <li>Go to the comic details and hit the buy button.</li>
            </ol>
            <span className='text-grey-100 italic'>
              * It&apos;s important to note that you&apos;ll need at least&nbsp;
              <span className='text-important-color'>0.0033 SOL</span> in your wallet to pay for protocol & on-chain
              fees, even if the comic is listed as free.
            </span>
          </Expandable>

          <Expandable title='🌐 How do I buy the comic from my mobile browser?' id='buy-on-mobile-browser'>
            <ExpandableText text='Our web app is currently available at https://www.dreader.app' />
            <ExpandableText text='To buy the comic:' />
            <ol className='list-decimal list-inside pl-5'>
              <li>Open our web app from your mobile wallet&apos;s in-app browser.</li>
              <li>
                <span className='text-important-color'>Make sure your email is verified</span> by going to&nbsp;
                <em>profile -&gt; account</em>.
              </li>
              <li>Find the comic you&apos;d like to buy (usually promoted on the homepage banner).</li>
              <li>Go to the comic details and hit the buy button.</li>
            </ol>
            <span className='text-grey-100 italic'>
              * It&apos;s important to note that you&apos;ll need&nbsp;
              <span className='text-important-color'>at least 0.0033 SOL</span> in your wallet to pay for protocol &
              on-chain fees, even if the comic is listed as free.
            </span>
          </Expandable>

          <Expandable title='💻 How do I buy the comic from my desktop browser?' id='buy-on-desktop-browser'>
            <ExpandableText text='Our web app is currently available at https://www.dreader.app' />
            <ExpandableText text='To buy the comic:' />
            <ol className='list-decimal list-inside pl-5'>
              <li>Open our web app.</li>
              <li>
                <span className='text-important-color'>Make sure your email is verified</span> by going to&nbsp;
                <em>profile -&gt; account</em>.
              </li>
              <li>Find the comic you&apos;d like to buy (usually promoted on the homepage banner).</li>
              <li>Go to the comic details and hit the buy button.</li>
            </ol>
            <span className='text-grey-100 italic'>
              * It&apos;s important to note that you&apos;ll need&nbspc;
              <span className='text-important-color'>at least 0.0033 SOL</span> in your wallet to pay for protocol &
              on-chain fees, even if the comic is listed as free.
            </span>
          </Expandable>
        </div>

        <div>
          <Text as='p' styleVariant='body-large' className='font-bold mb-2'>
            TROUBLESHOOTING
          </Text>
          <Expandable
            title={`⚠️ ERROR: "user/wallet aaa..aaa has reached the purchase limit"`}
            id='wallet-reached-purchase-limit'
          >
            <ExpandableText text='Some of our sales have limitations of assets bought per user/wallet basis. For example, you might only be eligible for 1 free comic, 2 public (paid) discounted comics, and unlimited public (full price) comics on a single comic sale.' />
          </Expandable>

          <Expandable
            title={`⚠️ ERROR: "transaction signature verification failure"`}
            id='transaction-signature-verification-failure'
          >
            <ExpandableText text="Phantom has an issue with their Seed Vault implementation on Saga. If you see this error, you're most likely using the Saga device and Phantom wallet." />
            <ExpandableText text='If the issue persists, connect your seed phrase to the Solflare wallet. Works like a charm. 🤌' />
          </Expandable>

          <Expandable title={`⚠️ ERROR: "not enough SOL in your wallet"`} id='not-enough-sol'>
            <ExpandableText text="It's in my personal interest to have as many comic enthusiasts on the platform. If the money is preventing you from minting, reach out to me on discord 'josipvolarevic' and I'll see if my personal treasury can help in any way." />
            <ExpandableText text="Especially if you're trying to buy the free comic but don't have 0.0033 SOL to pay for on-chain & protocol fees!" />
          </Expandable>
        </div>

        <div>
          <Text as='p' styleVariant='body-large' className='font-bold mb-2'>
            OTHER
          </Text>
          <Expandable title={`🫰 Where can I trade my comics?`} id='trading-comics'>
            <ExpandableText text='Comics can be traded within our mobile app. Web app is WIP progress, ETA Q3 2024.' />
            <ExpandableText text='Until then, you can buy comics from secondary marketplaces like ' />
            <Link href='https://www.tensor.trade/creator/dreader'>Tensor</Link>.
          </Expandable>

          <Expandable title={`💀 What happens if dReader dies?`} id='what-if-dReader-dies'>
            <ExpandableText text='Founders will look for a job at McDonalds, but your comics will still be safe! 🍟🍔' />
            <ExpandableText text="We're using " />
            <Link href='https://www.darkblock.io'>Darkblock protocol</Link>
            <ExpandableText text="for on-chain data encryption. Comic assets are stored on Arweave and encrypted so only the owner of the asset can read its content. If dReader goes under, you'll still be able to read the comics and trade on secondary." />
          </Expandable>

          <Expandable title={`🛒 Are there in-app purchases or subscriptions?`} id='in-app-purchases-and-subscriptions'>
            <ExpandableText text='Yes, dReader will offer a monthly subscription plan, providing you with access to a vast library of digital comics. Additionally, users can make in-app purchases to acquire digital comics and enhance their collections.' />
          </Expandable>

          <Expandable title={`📅 How can I stay updated with dReader news and updates?`} id='stay-updated'>
            <ExpandableText text='Follow us on our official social media channels to stay informed about the latest dReader news, updates, and events. Our main social media channel is ' />
            <Link href='https://x.com/dReaderApp'>Twitter</Link>
            <ExpandableText text='For other links visit our ' />
            <Link href='https://dreader.io/links'>linktree</Link>.
          </Expandable>

          <Expandable
            title={`🤪 What makes dReader different from other comic platforms?`}
            id='what-makes-dReader-special'
          >
            <ExpandableText text='dReader stands out for its focus on digital comic collecting, as well as, animated and gamified comics, and tokenized comic content. We offer a fresh and interactive approach to digital comics and manga.' />
          </Expandable>

          <Expandable title={`📖 How does the digital collecting experience work?`} id='digital-collecting-experience'>
            <ExpandableText text='With dReader, you can collect and own digital comics as if they were real-world collectibles. Some of the collectible experience includes: signing the comics by its author, and condition state of the comics. Our tokenized system ensures the rarity and uniqueness of each comic.' />
          </Expandable>

          <Expandable title={`🙋‍♂️ How can I contact support?`} id='contact-support'>
            <ExpandableText text='For any questions, concerns, or technical issues, please reach out to our support team at ' />
            <span className='text-important-color'>{SUPPORT_EMAIL}</span>
            <ExpandableText text=" or raise a #support ticket on our discord server. We're here to help." />
          </Expandable>
        </div>

        <div>
          <Text as='p' styleVariant='body-large' className='font-bold mb-2'>
            PUBLISHING
          </Text>
          <Expandable title={`✍️ Can I publish my own comics on dReader?`} id='publishing-comics'>
            <ExpandableText text='Yes, in order to publish comics/mangas on dReader, visit ' />
            <Link href='https://dpublisher.app'>dPublisher</Link>
            <ExpandableText text='. dPublisher is a website for self-publishing digital comics and mangas. For any questions, reach out to us at ' />
            <span className='text-important-color'>{SUPPORT_EMAIL}</span>.
          </Expandable>
        </div>
      </div>
    </div>
  )
}

export default FAQ

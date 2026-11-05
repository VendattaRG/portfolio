import s from './SectionHead.module.css'

type Props = { n: string; label: string; title: string; muted?: string; id?: string }

export default function SectionHead({ n, label, title, muted, id }: Props) {
  return (
    <div className={`${s.head} reveal`}>
      <span className="kicker">
        <b>{n}</b>
        {label}
      </span>
      <h2 className="h2" id={id}>
        {title} {muted && <span>{muted}</span>}
      </h2>
    </div>
  )
}

interface ActionBarIconProps {
    onClick: () => void
    iconClassName: string
}

const ActionBarIcon: React.FC<ActionBarIconProps> = ({ onClick, iconClassName}) => {
  return (
    <button className="button is-secondary is-small" onClick={onClick}>
        <span className="icon">
            <i className={iconClassName}></i>
        </span>
    </button>
  )
}

export default ActionBarIcon;

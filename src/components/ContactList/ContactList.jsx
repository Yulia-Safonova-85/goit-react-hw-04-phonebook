import PropTypes from 'prop-types';
import { Button,  List, ListItem } from "./ContactList.styled";

export const ContactList = ({ contacts,onDeleteContact }) => {
    return (
        <div>
            <List>
                {contacts.map(({ id, name, number }) => (
                    <ListItem key ={id}>
                        <p>{name}:  {number}</p>
                        <Button type="button" onClick={() => onDeleteContact(id) }>
                            Delete
                        </Button>
                    </ListItem>
                )
                )}
            </List>
        </div>
    )
}

ContactList.propTypes = {
    id: PropTypes.string,
    name:PropTypes.string,
    number:PropTypes.string,
}
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import InputGroup from 'react-bootstrap/InputGroup';

const apiUrl = 'http://localhost:5005'

const EditBarForm = () => {

    const [editBar, setEditBar] = useState({
        title: '',
        description: '',
        address: {
            text: '',
            latitude: 0,
            longitude: 0
        },
        average_price: '',
        rating: 0,
        opening_hours: '',
        gallery: [''],
        handicapped: false,
        contact: {
            phone_number: "",
            email: ''
        },
        capacity: 0
    })

    const { barId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchFormData()
    }, [])

    const fetchFormData = () => {
        axios
            .get(`${apiUrl}/bars/${barId}`)                      //get data
            .then(({ data }) => setEditBar(data))
            .catch((err) => console.log(err))
    }


    const handleInputChange = e => {
        const { name, value, checked, type } = e.target
        const newValue = type === 'checkbox' ? checked : value;
        setEditBar({ ...editBar, [name]: newValue });
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        axios
            .put(`${apiUrl}/bars/${barId}`, editBar)                 //put data
            .then(() => navigate(`/bars/${barId}`))
            .catch(err => console.log(err))
    }

    const addImageField = () => {
        const galleryCopy = [...editBar.gallery]
        galleryCopy.push('')
        setEditBar({ ...editBar, gallery: galleryCopy })
    }

    const handleGalleryChange = (e, index) => {
        const { value } = e.target
        const galleryCopy = [...editBar.gallery]
        galleryCopy[index] = value
        setEditBar({ ...editBar, gallery: galleryCopy })
    }

    const handleContactChange = e => {
        const { name, value } = e.target
        setEditBar({
            ...editBar, contact: {
                ...editBar.contact, [name]: value
            }
        })
    }

    const handleAddressChange = e => {
        const { name, value } = e.target
        setEditBar({
            ...editBar, address: {
                ...editBar.address, [name]: value
            }
        })
    }

    const handleCancel = () => {
        window.location.replace('');
    }

    return (
        <div className="EditBarForm mt-3">
            <Form onSubmit={handleFormSubmit} >
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Nombre del Bar *</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type='text'
                            placeholder="Introduce el nombre del Bar"
                            name="title"
                            value={editBar.title}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, rellene con el nombre del Bar que desea añadir.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>


                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce una breve descripción"
                        name="description"
                        value={editBar.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="AveragePrice">
                    <Form.Label>Precio Medio *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entre 00€ - 00€"
                        name="average_price"
                        value={editBar.average_price}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, rellene con el precio medio por comida/cena.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Valoración *</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Introduzca un número entre el 1 y el 5"
                        name="rating"
                        value={editBar.rating}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, Añada una Valoración.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="opening_hours">
                    <Form.Label>Horarios de Apertura y Cierre *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="horarios de apertura 00:00 - 00:00"
                        name="opening_hours"
                        value={editBar.opening_hours}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, Añada unos Horarios de apertura al Púbiclo .
                    </Form.Control.Feedback>
                </Form.Group>
                {/* --------------------------------- */}

                <Form.Group className="mb-3" controlId="Gallery" >
                    <Form.Label>Añade fotos</Form.Label>
                    {
                        editBar.gallery.map((eachField, idx) => {
                            return (
                                <Form.Control
                                    key={idx}
                                    className="mt-2"
                                    type="url"
                                    placeholder="Introduzca fotos del bar"
                                    value={eachField}
                                    onChange={e => handleGalleryChange(e, idx)}
                                />
                            )
                        })
                    }
                </Form.Group>

                <Button className="w-100" variant="secondary" onClick={addImageField}>Añadir nueva foto</Button>

                {/* -------------------------------- */}

                <Form.Group className="mb-3" controlId="handicapped" style={{ marginTop: '20px' }}>
                    <Form.Check
                        type="checkbox"
                        label="Habilitado para Discapacitados"
                        name="handicapped"
                        value={editBar.handicapped}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone_number">
                    <Form.Label>Número de Contacto *</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>📞</InputGroup.Text>
                        <Form.Control
                            type='text'
                            placeholder="Introduzca el teléfono de contacto"
                            name="phone_number"
                            value={editBar.contact.phone_number}
                            onChange={handleContactChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, complete este campo.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email de Contacto *</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            type='text'
                            placeholder="Introduzca el email de contacto"
                            name="email"
                            value={editBar.contact.email}
                            onChange={handleContactChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, complete este campo.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="capacity">
                    <Form.Label>Indica El Aforo Máximo</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Introduce el aforo máximo del Bar"
                        name="capacity"
                        value={editBar.capacity}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Row style={{ marginBottom: '50px', marginTop: '50px' }}>
                    <p className="text-center">Datos de la Dirección</p>
                    <hr />

                    <Col >
                        <Form.Group className="mb-3" controlId="details">
                            <Form.Label>Detalles * </Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Calle"
                                    name="text"
                                    value={editBar.address.text}
                                    onChange={handleAddressChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor,rellene con la calle del Bar.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="latitude">
                            <Form.Label>Latitud *</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Latitud"
                                name="latitude"
                                value={editBar.address.latitude}
                                onChange={handleAddressChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="longitude">
                            <Form.Label>Longitud * </Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="number"
                                    placeholder="Longuitud"
                                    name="longitude"
                                    value={editBar.address.longitude}
                                    onChange={handleAddressChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                </Row>

                <Button variant="dark" type="submit" className="w-100" style={{ marginTop: '20px' }}>
                    Guardar
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="w-100" style={{ marginTop: '20px' }}>
                    Cancelar Envío
                </Button>

            </Form>
        </div >

    )

}
export default EditBarForm
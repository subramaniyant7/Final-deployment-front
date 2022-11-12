import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';

const DialogComponent = ({ activeIndex, selectedMode, showModal, closeModal, createNewAction }) => {
    const medium = ['Development', 'Validation', 'Horizontal']
    console.log('activeIndex', activeIndex)
    console.log('selectedMode', selectedMode)
    let mode = selectedMode !== null ? selectedMode.name : ''
    console.log('mode', mode)
    let initialState = {
        name: "",
        category: medium[parseInt(activeIndex) - 1],
        feature_owner: "",
        domain: "",
        features: "",
        feature: "",
        feature_mode: mode,
        estimation_type: "",
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
        q7: "",
        q8: "",
        q9: "",
        q10: "",
        q11: "",
        q12: "",
        q13: "",
    };

    const [product, setProduct] = useState(initialState);
    const [error, setError] = useState({});

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => closeModal()} className="p-button-text" />
                <Button label="Save" icon="pi pi-check" type="submit" onClick={handleSubmit} autoFocus />
            </div>
        );
    }

    const estimations = [
        { name: 'HC' },
        { name: 'BTI' },
        { name: 'Hardware Resorces' },

    ];

    const handleSubmit = () => {
        let allErrors = {};
        if (!product.name) {
            allErrors.name = "Function Owner is required.";
        }

        if (!product.category) {
            allErrors.category = "Category is required";
        }

        if (!product.feature_owner) {
            allErrors.feature_owner = "Feature Owner is required";
        }

        if (!product.domain) {
            allErrors.domain = "Domain is required.";
        }

        if (!product.features) {
            allErrors.features = "Features is required";
        }

        if (!product.feature) {
            allErrors.feature = "Feature is required";
        }

        if (!product.feature_mode) {
            allErrors.feature_mode = "Feature Mode is required.";
        }

        if (!Object.keys(product.estimation_type).length) {
            allErrors.estimation_type = "Estimation Type is required";
        }

        if (Object.keys(allErrors).length) {
            setError(allErrors);
        } else {
            setError({});
            let createNew = { ...product }
            createNewAction(createNew)
            console.log('Submit to API');
        }
    }



    const RenderQuarter = () => {
        let htmlData = [];
        for (let p = 1; p <= 13; p++) {
            let name = `q${p}`
            let htmlField =
                <>
                    <div className="field col col-4">
                        <label htmlFor="price">Quarter {p} </label>
                        <InputNumber id="price" name={name} value={product[name]} onValueChange={(e) => setProduct(e.target.value)} mode="decimal"
                            minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    {error[name] !== '' ? <small className="p-error">{error[name]}</small> : null}
                </>
            htmlData.push(htmlField)
        }
        return htmlData
    }

    const handleEventChange = (name, value) => {
        setProduct({ ...product, [name]: value });
    }

    console.log('product', product)

    return (

        <div className="dialog-demo">
            <div className="card">
                <Dialog header="Action" visible={showModal} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => closeModal()}>
                    <form className="p-fluid">
                        <div className="field">
                            <label htmlFor="name">Function Owner</label>
                            <InputText value={product.name} name="name" onChange={(e) => handleEventChange('name', e.target.value)} required autoFocus />
                            {error?.name !== '' ? <small className="p-error">{error.name}</small> : null}
                        </div>

                        <div className="field">
                            <label className="mb-3">Function</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category1" name="category" value="Development" onChange={(e) => handleEventChange('category', e.target.value)}
                                        checked={product.category === 'Development'} disabled={product.category !== 'Development'} />
                                    <label htmlFor="category1">Development</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category2" name="category" value="Validation" onChange={(e) => handleEventChange('category', e.target.value)}
                                        checked={product.category === 'Validation'} disabled={product.category !== 'Validation'} />
                                    <label htmlFor="category2">Validation</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category3" name="category" value="Horizontal" onChange={(e) => handleEventChange('category', e.target.value)}
                                        checked={product.category === 'Horizontal'} disabled={product.category !== 'Horizontal'} />
                                    <label htmlFor="category3">Horizontal</label>
                                </div>
                                {error?.category !== '' ? <small className="p-error">{error.category}</small> : null}
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="name">Feature Owner</label>
                            <InputText id="name" name="feature_owner" value={product.feature_owner} onChange={(e) => handleEventChange('feature_owner', e.target.value)} required autoFocus />
                            {error?.feature_owner !== '' ? <small className="p-error">{error.feature_owner}</small> : null}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Domain</label>
                            <InputText id="name" name="domain" value={product.domain} onChange={(e) => handleEventChange('domain', e.target.value)} required autoFocus />
                            {error?.domain !== '' ? <small className="p-error">{error.domain}</small> : null}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Features</label>
                            <InputText id="name" name="features" value={product.features} onChange={(e) => handleEventChange('features', e.target.value)} required autoFocus />
                            {error?.features !== '' ? <small className="p-error">{error.features}</small> : null}
                        </div>

                        <div className="field">
                            <label className="mb-3">Feature ON/OFF</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="feature" value="Yes" onChange={(e) => handleEventChange('feature', e.target.value)} checked={product.feature === 'Yes'} />
                                    <label>Yes</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="feature" value="No" onChange={(e) => handleEventChange('feature', e.target.value)} checked={product.feature === 'No'} />
                                    <label >No</label>
                                </div>
                                {error?.feature !== '' ? <small className="p-error">{error.feature}</small> : null}
                            </div>
                        </div>

                        <div className="field">
                            <label className="mb-3">Feature Mode</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="feature_mode" value="Low" onChange={(e) => handleEventChange('feature_mode', e.target.value)}
                                        checked={product.feature_mode === 'Low Modify'} disabled={product.feature_mode !== 'Low Modify' && mode !== ''}/>
                                    <label>Low</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="feature_mode" value="Medium" onChange={(e) => handleEventChange('feature_mode', e.target.value)}
                                        checked={product.feature_mode === 'Medium Modify'} disabled={product.feature_mode !== 'Medium Modify' && mode !== ''}/>
                                    <label >Medium</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="feature_mode" value="Heavy" onChange={(e) => handleEventChange('feature_mode', e.target.value)}
                                        checked={product.feature_mode === 'Heavy Modify'} disabled={product.feature_mode !== 'Heavy Modify' && mode !== ''}/>
                                    <label htmlFor="category3">Heavy</label>
                                </div>
                                {error?.feature_mode !== '' ? <small className="p-error">{error.feature_mode}</small> : null}
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="name">Estimation Type</label>
                            <Dropdown value={product.estimation_type} options={estimations} name="estimation_type" onChange={(e) => handleEventChange('estimation_type', e.target.value)} optionLabel="name"
                                placeholder="Select Estimation Type" />
                            {error?.estimation_type !== '' ? <small className="p-error">{error.estimation_type}</small> : null}
                        </div>

                        <div className="formgrid grid">
                            {
                                RenderQuarter()
                            }
                        </div>

                    </form>
                </Dialog>

            </div>
        </div>

    )
}

export default DialogComponent;
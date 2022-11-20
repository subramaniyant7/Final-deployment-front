import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';

const DialogComponent = ({ activeIndex, selectedMode, showModal, closeModal, createNewAction }) => {
    const medium = ['Development', 'Validation', 'Horizontal']
    let mode = selectedMode !== null ? selectedMode.name : ''
    let initialState = {
        domain: "",
        estimation_type: "",
        feature_owner: "",
        features: "",
        function: medium[parseInt(activeIndex) - 1],
        function_owner: "",
        mode: "",
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        q6: 0,
        q7: 0,
        q8: 0,
        q9: 0,
        q10: 0,
        q11: 0,
        q12: 0,
        q13: 0,
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
        if (!product.function_owner) {
            allErrors.function_owner = "Function Owner is required.";
        }

        if (!product.function) {
            allErrors.function = "Function is required";
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

        if (!product.status) {
            allErrors.status = "Features On/Off is required";
        }

        if (!product.mode) {
            allErrors.mode = "Feature Mode is required";
        }

        if (!Object.keys(product.estimation_type).length) {
            allErrors.estimation_type = "Estimation Type is required";
        }

        if (Object.keys(allErrors).length) {
            setError(allErrors);
        } else {
            console.log('product', product)
            setError({});
            let createNew = { ...product }
            createNewAction(createNew)
            console.log('Submit to API');
        }
    }



   
    const handleEventChange = (name, value) => {
        setProduct({ ...product, [name]: value });
    }

    const RenderQuarter = () => {
        let htmlData = [];
        for (let p = 1; p <= 13; p++) {
            let name = `q${p}`
            let htmlField =
                <>
                    <div className="field col col-4">
                        <label htmlFor="price">Quarter {p} </label>
                        <InputNumber id="price" name={name} value={product[name]} onValueChange={(e) => handleEventChange([name],e.target.value)} mode="decimal"
                            minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    {error[name] !== '' ? <small className="p-error">{error[name]}</small> : null}
                </>
            htmlData.push(htmlField)
        }
        return htmlData
    }


    console.log('product', product)
    console.log('error', error)

    return (

        <div className="dialog-demo">
            <div className="card">
                <Dialog header="Action" visible={showModal} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => closeModal()}>
                    <form className="p-fluid">
                        <div className="field">
                            <label htmlFor="name">Function Owner</label>
                            <InputText value={product.name} name="function_owner" onChange={(e) => handleEventChange('function_owner', e.target.value)} required autoFocus />
                            {error?.function_owner !== '' ? <small className="p-error">{error.function_owner}</small> : null}
                        </div>

                        <div className="field">
                            <label className="mb-3">Function</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category1" name="function" value="Development" onChange={(e) => handleEventChange('function', e.target.value)}
                                        checked={product.function === 'Development'} disabled={product.function !== 'Development'} />
                                    <label htmlFor="category1">Development</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category2" name="function" value="Validation" onChange={(e) => handleEventChange('function', e.target.value)}
                                        checked={product.function === 'Validation'} disabled={product.function !== 'Validation'} />
                                    <label htmlFor="category2">Validation</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category3" name="function" value="Horizontal" onChange={(e) => handleEventChange('function', e.target.value)}
                                        checked={product.function === 'Horizontal'} disabled={product.function !== 'Horizontal'} />
                                    <label htmlFor="category3">Horizontal</label>
                                </div>
                                {error?.function !== '' ? <small className="p-error">{error.function}</small> : null}
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
                                    <RadioButton name="status" value="Yes" onChange={(e) => handleEventChange('status', e.target.value)} checked={product.status === 'Yes'} />
                                    <label>Yes</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="status" value="No" onChange={(e) => handleEventChange('status', e.target.value)} checked={product.status === 'No'} />
                                    <label >No</label>
                                </div>
                                {error?.status !== '' ? <small className="p-error">{error.status}</small> : null}
                            </div>
                        </div>

                        <div className="field">
                            <label className="mb-3">Feature Mode</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="mode" value="Low" onChange={(e) => handleEventChange('mode', e.target.value)}
                                        checked={product.mode === 'Low Modify'} disabled={product.mode !== 'Low Modify' && mode !== ''} />
                                    <label>Low</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="mode" value="Medium" onChange={(e) => handleEventChange('mode', e.target.value)}
                                        checked={product.mode === 'Medium Modify'} disabled={product.mode !== 'Medium Modify' && mode !== ''} />
                                    <label >Medium</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton name="mode" value="Heavy" onChange={(e) => handleEventChange('mode', e.target.value)}
                                        checked={product.mode === 'Heavy Modify'} disabled={product.mode !== 'Heavy Modify' && mode !== ''} />
                                    <label htmlFor="category3">Heavy</label>
                                </div>
                                {error?.mode !== '' ? <small className="p-error">{error.mode}</small> : null}
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
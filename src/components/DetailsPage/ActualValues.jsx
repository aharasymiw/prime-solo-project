import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { round1 } from '../../fe_utils/fe_utils'
import axios from 'axios';

import './ActualValues.css';

function ActualValues({ anonymous_id, set_anonymous_id, ett_size_actual, set_ett_size_actual, ett_depth_actual, set_ett_depth_actual, uac_depth_actual, set_uac_depth_actual, uvc_depth_actual, set_uvc_depth_actual }) {

    // 
    const newPatient = useSelector(store => store.newPatient);
    const dispatch = useDispatch();

    useEffect(() => {
        newPatient.anonymous_id && set_anonymous_id(newPatient.anonymous_id);
        newPatient.ett_size_actual && set_ett_size_actual(newPatient.ett_size_actual);
        newPatient.ett_depth_actual && set_ett_depth_actual(newPatient.ett_depth_actual);
        newPatient.uac_depth_actual && set_uac_depth_actual(newPatient.uac_depth_actual);
        newPatient.uvc_depth_actual && set_uvc_depth_actual(newPatient.uvc_depth_actual);
    }, [newPatient]);

    return (
        <div className="container">

            {newPatient.anonymous_id &&
                <fieldset>
                    <legend>Details - Actual</legend>

                    <section id="details_intro">
                        <h4>Subject ID</h4>
                        <input
                            type="text"
                            name="anonymous_id"
                            required
                            value={anonymous_id}
                            onChange={(event) => set_anonymous_id(event.target.value)}
                        />
                    </section>

                    <section>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Estimated</th>
                                    <th>Actual</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p>ETT</p><p>Size</p></td>
                                    <td>{newPatient.ett_size_calc}</td>
                                    <td>

                                        <select
                                            // defaultValue={ett_size_calc}
                                            value={ett_size_actual}
                                            onChange={e => set_ett_size_actual(e.target.value)}
                                        >
                                            <option value="2">2</option>
                                            <option value="2.5">2.5</option>
                                            <option value="3">3</option>
                                            <option value="3.5">3.5</option>
                                            <option value="4">4</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>ETT</p><p>Depth</p></td>
                                    <td>{newPatient.ett_depth_weight_calc}</td>
                                    <td>
                                        <select
                                            // defaultValue={ett_depth_weight_calc}
                                            value={ett_depth_actual}
                                            onChange={e => set_ett_depth_actual(e.target.value)}
                                        >
                                            <option value="5.5">5.5</option>
                                            <option value="6">6</option>
                                            <option value="6.5">6.5</option>
                                            <option value="7">7</option>
                                            <option value="7.5">7.5</option>
                                            <option value="8">8</option>
                                            <option value="8.5">8.5</option>
                                            <option value="9">9</option>
                                            <option value="9.5">9.5</option>
                                            <option value="10">10</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>UAC</p><p>Depth</p></td>
                                    <td>{round1(newPatient.uac_depth_calc)}</td>
                                    <td>
                                        <select
                                            // defaultValue={uac_depth_calc}
                                            value={uac_depth_actual}
                                            onChange={e => set_uac_depth_actual(e.target.value)}
                                        >
                                            <option value="7">7</option>
                                            <option value="7.25">7.25</option>
                                            <option value="7.5">7.5</option>
                                            <option value="7.75">7.75</option>

                                            <option value="8">8</option>
                                            <option value="8.25">8.25</option>
                                            <option value="8.5">8.5</option>
                                            <option value="8.75">8.75</option>

                                            <option value="9">9</option>
                                            <option value="9.25">9.25</option>
                                            <option value="9.5">9.5</option>
                                            <option value="9.75">9.75</option>

                                            <option value="10">10</option>
                                            <option value="10.25">10.25</option>
                                            <option value="10.5">10.5</option>
                                            <option value="10.75">10.75</option>

                                            <option value="11">11</option>
                                            <option value="11.25">11.25</option>
                                            <option value="11.5">11.5</option>
                                            <option value="11.75">11.75</option>

                                            <option value="12">12</option>
                                            <option value="12.25">12.25</option>
                                            <option value="12.5">12.5</option>
                                            <option value="12.75">12.75</option>

                                            <option value="13">13</option>
                                            <option value="13.25">13.25</option>
                                            <option value="13.5">13.5</option>
                                            <option value="13.75">13.75</option>

                                            <option value="14">14</option>
                                            <option value="14.25">14.25</option>
                                            <option value="14.5">14.5</option>
                                            <option value="14.75">14.75</option>

                                            <option value="15">15</option>
                                            <option value="15.25">15.25</option>
                                            <option value="15.5">15.5</option>
                                            <option value="15.75">15.75</option>

                                            <option value="16">16</option>
                                            <option value="16.25">16.25</option>
                                            <option value="16.5">16.5</option>
                                            <option value="16.75">16.75</option>

                                            <option value="17">17</option>
                                            <option value="17.25">17.25</option>
                                            <option value="17.5">17.5</option>
                                            <option value="17.75">17.75</option>

                                            <option value="18">18</option>
                                            <option value="18.25">18.25</option>
                                            <option value="18.5">18.5</option>
                                            <option value="18.75">18.75</option>

                                            <option value="19">19</option>
                                            <option value="19.25">19.25</option>
                                            <option value="19.5">19.5</option>
                                            <option value="19.75">19.75</option>

                                            <option value="20">20</option>
                                            <option value="20.25">20.25</option>
                                            <option value="20.5">20.5</option>
                                            <option value="20.75">20.75</option>

                                            <option value="21">21</option>
                                            <option value="21.25">21.25</option>
                                            <option value="21.5">21.5</option>
                                            <option value="21.75">21.75</option>

                                            <option value="22">22</option>
                                            <option value="22.25">22.25</option>
                                            <option value="22.5">22.5</option>
                                            <option value="22.75">22.75</option>

                                            <option value="23">23</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>UVC</p><p>Depth</p></td>
                                    <td>{round1(newPatient.uvc_depth_calc)}</td>
                                    <td>
                                        <select
                                            // defaultValue={uvc_depth_calc}
                                            value={uvc_depth_actual}
                                            onChange={e => set_uvc_depth_actual(e.target.value)}
                                        >
                                            <option value="4">4</option>
                                            <option value="4.25">4.25</option>
                                            <option value="4.5">4.5</option>
                                            <option value="4.75">4.75</option>

                                            <option value="5">5</option>
                                            <option value="5.25">5.25</option>
                                            <option value="5.5">5.5</option>
                                            <option value="5.75">5.75</option>

                                            <option value="6">6</option>
                                            <option value="6.25">6.25</option>
                                            <option value="6.5">6.5</option>
                                            <option value="6.75">6.75</option>

                                            <option value="7">7</option>
                                            <option value="7.25">7.25</option>
                                            <option value="7.5">7.5</option>
                                            <option value="7.75">7.75</option>

                                            <option value="8">8</option>
                                            <option value="8.25">8.25</option>
                                            <option value="8.5">8.5</option>
                                            <option value="8.75">8.75</option>

                                            <option value="9">9</option>
                                            <option value="9.25">9.25</option>
                                            <option value="9.5">9.5</option>
                                            <option value="9.75">9.75</option>

                                            <option value="10">10</option>
                                            <option value="10.25">10.25</option>
                                            <option value="10.5">10.5</option>
                                            <option value="10.75">10.75</option>

                                            <option value="11">11</option>
                                            <option value="11.25">11.25</option>
                                            <option value="11.5">11.5</option>
                                            <option value="11.75">11.75</option>

                                            <option value="12">12</option>
                                            <option value="12.25">12.25</option>
                                            <option value="12.5">12.5</option>
                                            <option value="12.75">12.75</option>

                                            <option value="13">13</option>
                                            <option value="13.25">13.25</option>
                                            <option value="13.5">13.5</option>
                                            <option value="13.75">13.75</option>

                                            <option value="14">14</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </section>
                </fieldset>
            }

        </div>
    );
}

export default ActualValues;
